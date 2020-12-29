import Mail from "@corejam/notify/dist/server/Mail";
import { UserDB } from "../../shared/types/User";

/**
 * Email for a password reset request with the token
 */
export default class PasswordResetRequest extends Mail {

    /**
     * Base64 object of email and token
     */
    private token: string;

    constructor(user: UserDB, token: string) {
        super(user.email, "Password reset request");

        this.token = token;
    }

    getBody(): string {
        return (`
            A password reset has been requested for your account.
            Please click here to continue: <a href="/login/reset?reset=${this.token}"></a>
        `)
    }
}