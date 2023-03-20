import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { LoginMaterialModule } from "./login-material.module";
import { LoginComponent } from "./login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, LoginMaterialModule],
  exports: [LoginComponent],
})
export class LoginModule {}
