import { NgModule } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { HttpLoaderFactory } from "src/app/app-core.module";

const modules = [
  TranslateModule.forChild({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    },
    isolate: false,
  }),
];

@NgModule({
  declarations: [],
  imports: [modules],
  exports: [modules],
})
export class TranslateForChildModule {}
