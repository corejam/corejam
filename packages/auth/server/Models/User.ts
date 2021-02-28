import { CoreModel } from "@corejam/base/dist/db/CoreModel";
import { Coredata } from "@corejam/base/dist/db/ModelDecorator";
import { ID } from "@corejam/base/dist/typings/DB";
import * as crypto from "crypto";
import { JWT } from "../../shared/types/User";
import { UnauthorizedException } from "../Errors";
import { encodeJWTPayload } from "../Functions";

enum STATUS {
    PENDING = "PENDING",
    VERIFIED = "VERIFIED",
}

enum ROLES {
    ADMIN = "admin",
    USER = "user",
}

type AuthReset = {
    expires: string;
    hash: string;
};

/**
 * Our root user object
 */
export default class User extends CoreModel {

    collection = "users";

    static STATUS = STATUS;
    static ROLES = ROLES;

    @Coredata()
    email = '';

    @Coredata()
    password?: string;

    @Coredata()
    status: STATUS = STATUS.PENDING;

    @Coredata()
    verifyHash?: string;

    @Coredata()
    active = false;

    @Coredata()
    role: [ROLES] = [ROLES.USER];

    @Coredata()
    refreshToken?: string;

    @Coredata()
    authReset?: AuthReset;

    /**
     * Generate a JWT token for the current user
     */
    async generateJWT(): Promise<JWT> {
        if (!this.exists()) throw new UnauthorizedException();

        const payload = {
            id: this.id,
            role: this.role,
        };

        const token = encodeJWTPayload(payload, process.env.JWT_EXPIRES);
        const refreshToken = encodeJWTPayload(payload, process.env.JWT_REFRESH_EXPIRES);

        this.refreshToken = refreshToken;
        await this.save();

        return {
            user: {
                id: this.id as ID,
                email: this.email,
                status: this.status,
                active: this.active,
                role: this.role,
                dateCreated: "",
                dateUpdated: ""
            },
            token: token,
            refreshToken: refreshToken,
        };
    }

    /**
     * Sets the initial verify hash for email verification
     * and saves it to this user.
     */
    async generateVerifyHash(): Promise<string> {
        const verifyHash = crypto.randomBytes(20).toString("hex");

        this.verifyHash = verifyHash
        await this.save();

        return verifyHash;
    }

    /**
     * Check if a user can perform role based action
     */
    checkUserHasRole(checkRole: ROLES): Boolean {
        let res = false;

        this.role.forEach((role) => {
            if (role === checkRole) res = true;
        });

        if (!res) throw new UnauthorizedException();

        return res;
    }
}