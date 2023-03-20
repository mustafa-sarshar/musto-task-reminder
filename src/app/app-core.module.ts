import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";

import { AuthInterceptorService } from "./shared/services";

const modules = [BrowserAnimationsModule, LayoutModule, HttpClientModule];

@NgModule({
  imports: [modules],
  exports: [modules],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppCoreModule {}
