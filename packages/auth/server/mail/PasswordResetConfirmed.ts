import Mail from "@corejam/notify/dist/server/Mail";
import { UserDB } from "../../shared/types/User";

/**
 * This email gets sent after a password has been reset
 */
export default class PasswordResetConfirmed extends Mail {
  constructor(user: UserDB) {
    super(user.email, "Your password has been reset");
  }

  getBody(): string {
    return `
            Your password has been succesfully changed.
        `;
  }
}
