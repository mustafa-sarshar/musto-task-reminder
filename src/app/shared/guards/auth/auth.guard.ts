import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, map, take } from "rxjs";

import { DataFlowService } from "../../services/data-flow/data-flow.service";
import { User } from "../../models";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(
    private dataFlowService: DataFlowService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.dataFlowService.userData) {
      return this.dataFlowService.userData.pipe(
        take(1),
        map((userData: User | null) => {
          if (userData) {
            const isAuthenticated = userData.token;
            if (isAuthenticated) {
              return true;
            } else {
              return this.router.createUrlTree(["/welcome"]);
            }
          } else {
            return this.router.createUrlTree(["/welcome"]);
          }
        })
      );
    } else {
      return this.router.createUrlTree(["/welcome"]);
    }
  }
}
