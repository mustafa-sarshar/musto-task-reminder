import { Task } from "./task.model";

export class User {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public username?: string,
    public birthDate?: Date,
    public tasks?: Task[]
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

export class UserProfile {
  constructor(
    public id: string,
    public username: string,
    public email: string,
    public birthDate: Date,
    public tasks?: Task[]
  ) {}
}
