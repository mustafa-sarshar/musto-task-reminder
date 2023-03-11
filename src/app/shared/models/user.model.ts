export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return "";
    } else {
      return this._token;
    }
  }
}

export class UserRegistrationCredentials {
  constructor(
    public username: string,
    public email: string,
    public birthDate: Date,
    public password: string
  ) {}
}

export class UserLoginCredentials {
  constructor(public email: string, public password: string) {}
}
