import { DBDocument } from "@corejam/base/dist/typings/Utils";
import {
    RegisterInput as RootRegisterInput,
    UserCreateInput as RootUserCreateInput,
    User as RootUser
} from "@corejam/plugin-auth/dist/shared/types/User";
import { Address } from "./Address";

export declare type User = RootUser & {
    firstName: string,
    lastName: string,
    addressShipping?: Address,
    addressBilling?: Address
}

export declare type UserCreateInput = RootUserCreateInput & {
    firstName: string,
    lastName: string
}

export declare type UserInput = Partial<User>;

export declare type RegisterInput = RootRegisterInput & {
    firstName: string,
    lastName: string
}

export declare type UserDB = User & DBDocument;