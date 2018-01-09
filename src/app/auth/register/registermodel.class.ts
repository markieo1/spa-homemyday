export class RegisterModel {
  /**
    * The email of the registering user
    */
  public email: string;

  /**
    * The password
    */
  public password: string;

  /**
    * The confirm password
    */
  public confirmPassword: string;

  /**
    * Checks if the passwords match
    */
  public doPasswordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
