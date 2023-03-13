import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, exhaustMap, take } from "rxjs";

import { AuthService } from "./auth.service";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.authService.userData.pipe(
      take(1),
      exhaustMap((userData: User) => {
        console.log("exhaustMap", userData);
        if (!userData) {
          return next.handle(req);
        }
        const reqModified = req.clone({
          params: new HttpParams().set("auth", userData.token),
        });
        return next.handle(reqModified);
      })
    );
  }
}

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
];
