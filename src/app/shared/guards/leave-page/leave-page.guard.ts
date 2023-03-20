import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { onCanDeactivate } from "..";

@Injectable({
  providedIn: "root",
})
export class LeavePageGuard implements CanDeactivate<onCanDeactivate> {
  canDeactivate(
    component: onCanDeactivate,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return component.onCanDeactivate();
  }
}
