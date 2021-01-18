/* Defines the auth entity */
export interface Auth {
  access_Token: string;
  refresh_Token: string;
  error: string;
  error_Description: string;
}

export interface Login {
  username: string;
  password: string;
  email?: string;
  cURL?: string;
}

export interface Activate {
  activationId: string;
  newPassword: string;
  confirmPassword: string;
  _cURL?: string;
}
