import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppCoreModule } from "./app-core.module";

import { SharedViewsModule } from "./shared/views/shared-views.module";
import { AppMaterialModule } from "./app-material.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppCoreModule,
    AppRoutingModule,
    AppMaterialModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    SharedViewsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
