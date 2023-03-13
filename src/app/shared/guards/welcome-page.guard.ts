import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, map, take } from "rxjs";

import { AuthService } from "../services";
import { User } from "../models";

@Injectable({
  providedIn: "root",
})
export class WelcomePageGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authService.userData.pipe(
      take(1),
      map((userData: User | null) => {
        if (userData) {
          return this.router.createUrlTree(["/tasks"]);
        } else {
          return true;
        }
      })
    );
  }
}
