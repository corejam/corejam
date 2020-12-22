import Mail from "@corejam/notify/dist/server/Mail";
import { UserDB } from "../../shared/types/User";

const Template = (_user: UserDB) => `
In order to activate you account please click on the following link
`

/**
 * Verification email with link to activate a users account
 */
export default class RegisterVerifyMail extends Mail {
    constructor(user: UserDB) {
        super(user.email, "Verify your email", Template(user));
    }
}