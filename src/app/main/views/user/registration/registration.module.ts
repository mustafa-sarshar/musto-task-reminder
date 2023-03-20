import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RegistrationMaterialModule } from "./registration-material.module";
import { RegistrationComponent } from "./registration.component";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [CommonModule, ReactiveFormsModule, RegistrationMaterialModule],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
