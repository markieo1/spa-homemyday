export class RegisterModel {
  email: string;
  password: string;
  confirmPassword: string;

  /**
    * Checks if the passwords match
    */
  public doPasswordsMatch(): boolean {
    return this.password === this.confirmPassword;
  }
}
