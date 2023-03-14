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

import { DataFlowService } from "../data-flow/data-flow.service";
import { User } from "../../models";

@Injectable({
  providedIn: "root",
})
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private dataFlowService: DataFlowService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.dataFlowService.userData.pipe(
      take(1),
      exhaustMap((userData: User) => {
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
