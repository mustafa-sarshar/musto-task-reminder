import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { RegistrationComponent } from "./registration.component";
import { RegistrationMaterialModule } from "./registration-material.module";

import { TranslateForChildModule } from "src/app/shared/modules";

@NgModule({
  declarations: [RegistrationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RegistrationMaterialModule,
    TranslateForChildModule,
  ],
  exports: [RegistrationComponent],
})
export class RegistrationModule {}
