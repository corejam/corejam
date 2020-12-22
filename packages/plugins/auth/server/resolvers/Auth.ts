import { MergedServerContext } from "../../shared/types/PluginResolver";
import { roles, UserList } from "../../shared/types/User";
import { AccountExistsError } from "../Errors";
import { checkUserHasRole, generateVerifyHash, validateAuthInput, validatePasswordCreate } from "../Functions";
import RegisterVerifyMail from "../mail/RegisterVerify";

function setRefreshHeaders(jwt, { req, res }) {
  const JWT_REFRESH_EXPIRES = process.env.JWT_REFRESH_EXPIRES as string;
  const maxAge = Number.parseInt(JWT_REFRESH_EXPIRES);
  const secureOptions = `HttpOnly; Secure;`;
  const options = req?.headers.host?.indexOf("localhost") === 0 ? "" : secureOptions;

  res.setHeader("Set-Cookie", `refreshToken=${jwt.refreshToken};${options} Max-Age=${maxAge}; Path=/;`);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  if (req.headers.host?.indexOf("localhost") === 0) {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3001");
  }

  delete jwt.refreshToken;

  return jwt;
}

/**
 * Our resolvers for this plugin
 */
export default {
  Query: {
    userById: async (_obj: any, args: any, { models, user }: MergedServerContext) => {
      const currentUser = await user();
      if (currentUser.id === args.id || checkUserHasRole(currentUser, roles.ADMIN)) {
        return await models.userById(args.id);
      }
      return null;
    },
    paginateUsers: async (_obj: any, { size, page }, { models }: MergedServerContext) => {
      // checkUserHasRole(await user(), roles.ADMIN);

      const offset = (page - 1) * size;
      const allUsers = await models.allUsers()

      const items = allUsers.slice(offset, offset + size);

      const paginated: UserList = {
        currentPage: page,
        totalItems: allUsers.length,
        lastPage: Math.ceil(allUsers.length / size),
        perPage: size,
        items: items,
      };

      return new Promise((res) => res(paginated));
    }
  },
  Mutation: {
    userEdit: async (_obj: any, args: any, { models, user }: MergedServerContext) => {
      const currentUser = await user();
      if (args.id !== currentUser.id) checkUserHasRole(await user(), roles.ADMIN)

      return models.userEdit(args.id, args.userInput);
    },
    userRegister: async (_obj: any, args: any, { models, notify }: MergedServerContext) => {
      validateAuthInput(args.data.email);
      validatePasswordCreate(args.data);

      if (await models.userByEmail(args.data.email)) {
        throw new AccountExistsError();
      }

      const user = await models.userRegister(args.data);
      user.verifyHash = await generateVerifyHash(user, models.userEdit)
      notify.sendMail(new RegisterVerifyMail(user));

      return user;
    },
    userAuthenticate: async (_obj: any, args: any, { models, eventEmitter, res, req }: MergedServerContext) => {
      validateAuthInput(args.email);

      const jwt = await models.userAuthenticate(args.email, args.password);

      eventEmitter?.emit("loggedIn", {
        user: args.email,
      });

      return setRefreshHeaders(jwt, { req, res });
    },
    userTokenRefresh: async (_obj: any, _args: any, { req, res, models }: MergedServerContext) => {
      const rx = /([^;=\s]*)=([^;]*)/g;
      const obj = {};
      for (let m; (m = rx.exec(req?.headers.cookie ?? ""));) {
        obj[m[1]] = decodeURIComponent(m[2]);
      }

      const jwt = await models.userTokenRefresh(obj["refreshToken"]);

      return setRefreshHeaders(jwt, { req, res });
    },
    userCreate: async (_obj: any, args: any, { models, user }: MergedServerContext) => {
      checkUserHasRole(await user(), roles.ADMIN);

      return models.userCreate(args.userCreateInput);
    },
    me: async (_obj: any, _args: any, { user }: MergedServerContext) => {
      return await user();
    }
  }
};
