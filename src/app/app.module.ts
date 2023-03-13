import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { ServiceWorkerModule } from "@angular/service-worker";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LayoutModule } from "@angular/cdk/layout";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AppMaterialModule } from "./app-material.module";

import { httpInterceptorProviders } from "./shared/services/auth-interceptor.service";

import { WelcomePageComponent } from "./main/views/welcome-page/welcome-page.component";
import { ConfirmationDialogComponent } from "./shared/views/confirmation-dialog/confirmation-dialog.component";
import { LoadingSpinnerComponent } from "./shared/views/loading-spinner/loading-spinner.component";
import { NavigationBarComponent } from "./shared/views/navigation-bar/navigation-bar.component";
import { FooterComponent } from "./shared/views/footer/footer.component";
import { LanguageComponent } from "./shared/views/language/language.component";
import { RegistrationComponent } from "./main/views/user/registration/registration.component";
import { LoginComponent } from "./main/views/user/login/login.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TasksComponent } from './main/views/tasks/tasks.component';
import { UserProfileComponent } from './main/views/user/user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePageComponent,
    ConfirmationDialogComponent,
    LoadingSpinnerComponent,
    NavigationBarComponent,
    FooterComponent,
    LanguageComponent,
    RegistrationComponent,
    LoginComponent,
    TasksComponent,
    UserProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: "registerWhenStable:30000",
    }),
    BrowserAnimationsModule,
    AppMaterialModule,
    LayoutModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
