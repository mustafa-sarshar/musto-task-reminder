import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { User, UserRegistrationCredentials } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  public userData: BehaviorSubject<User> = new BehaviorSubject<User>(
    new User("", "", "", new Date())
  );
  constructor() {}

  public registerUser(userData: UserRegistrationCredentials): void {
    console.log(userData);
  }
}
