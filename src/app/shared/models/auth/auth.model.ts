export interface AuthUserCredentials {
  email: string;
  password: string;
}

export interface AuthResponsePayload {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}
