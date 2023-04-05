import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginMaterialModule } from "./login-material.module";
import { LoginComponent } from "./login.component";

import { TranslateForChildModule } from "src/app/shared/modules";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginMaterialModule,
    TranslateForChildModule,
  ],
  exports: [LoginComponent],
})
export class LoginModule {}
