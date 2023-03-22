import { NgModule } from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpClientModule,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";

import { AuthInterceptorService } from "./shared/services";

const modules = [
  BrowserAnimationsModule,
  LayoutModule,
  HttpClientModule,
  TranslateModule.forRoot({
    defaultLanguage: "en-US",
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
  }),
];

export function HttpLoaderFactory(httpClient: HttpClient) {
  // return new TranslateHttpLoader(httpClient, "./assets/i18n/", ".json");
  return new TranslateHttpLoader(httpClient);
}

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
