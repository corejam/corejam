import Mail from "@corejam/notify/dist/server/Mail";
import User from "../Models/User";

/**
 * Verification email with link to activate a users account
 */
export default class RegisterVerifyMail extends Mail {
  private user: User;

  constructor(user: User) {
    super(user.email, "Verify your email");
    this.user = user;
  }

  getBody(): string {
    const link = `/register/verify?email=${this.user.email}&token=${this.user.verifyHash}`;

    return `
            In order to activate you account please click on the following link:
             <a href="${link}">${link}</a>
        `;
  }
}
