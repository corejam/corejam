import { CoreModel } from "@corejam/base/dist/db/CoreModel"
import { CoreData } from "@corejam/base/dist/db/ModelDecorator"

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
export class User extends CoreModel {

    collection = "users";

    static STATUS = STATUS;
    static ROLES = ROLES;

    @CoreData()
    email = '';

    @CoreData()
    password?: string;

    @CoreData()
    status: STATUS = STATUS.PENDING;

    @CoreData()
    verifyHash?: string;

    @CoreData()
    active = false;

    @CoreData()
    role: [ROLES] = [ROLES.USER];

    @CoreData()
    refreshToken?: string;

    @CoreData()
    authReset?: AuthReset;
}