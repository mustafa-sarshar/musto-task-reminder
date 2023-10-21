import { AuthGuard } from "./auth/auth.guard";
import { UrlTree } from "@angular/router";
import { Observable } from "rxjs";

import { LeavePageGuard } from "./leave-page/leave-page.guard";
import { WelcomePageGuard } from "./welcome-page/welcome-page.guard";

interface onCanDeactivate {
  onCanDeactivate: () =>
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>;
}

export { AuthGuard, WelcomePageGuard, LeavePageGuard, onCanDeactivate };
