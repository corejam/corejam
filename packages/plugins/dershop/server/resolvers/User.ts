import { MergedServerContext } from "../../shared/types/PluginResolver"

export default {
    Query: {
        currentUser: async (_obj: any, _args: any, { user }: MergedServerContext) => {
            return user ? user() : null;
        }
    },
    Mutation: {
        userRegister: async (_obj: any, { data }, { models }: MergedServerContext) => {
            return models.userRegister(data)
        }
    }
}