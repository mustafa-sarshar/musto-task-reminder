import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { WelcomePageRoutingModule } from "./welcome-page-routing.module";
import { WelcomePageMaterialModule } from "./welcome-page-material.module";
import { LoginModule } from "../user/login/login.module";
import { RegistrationModule } from "../user/registration/registration.module";

import { WelcomePageComponent } from "./welcome-page.component";

@NgModule({
  declarations: [WelcomePageComponent],
  imports: [
    CommonModule,
    WelcomePageRoutingModule,
    WelcomePageMaterialModule,
    LoginModule,
    RegistrationModule,
  ],
})
export class WelcomePageModule {}
