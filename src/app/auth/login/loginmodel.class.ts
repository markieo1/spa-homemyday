export class LoginModel {
  /**
   * The email of the user logged in
   */
  email: string;

  /**
   * The password of the user logged in
   */
  password: string;

  /**
   * The token supplied by an OTP application
   */
  otpToken: string;
}
