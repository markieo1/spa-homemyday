import { UserRoles } from '../enums/userroles.enum';

export interface IUserToken {
  /**
   * The id of the user
   */
  id: string;

  /**
   * The email of the user
   */
  email: string;

  /**
   * The role the user is in
   */
  role: UserRoles;

  /**
   * Determines if OTP is enabled
   */
  otpEnabled: boolean;
}
