export interface User {
  /** The auth provider */
  authProvider: string;
  /** User email */
  email: string;
  /** User name */
  name: string;
  /** Time user was created */
  timeCreated: string;
  /** UUID of auth object */
  uid: string;
}
