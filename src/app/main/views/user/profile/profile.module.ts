import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileMaterialModule } from "./profile-material.module";
import { TranslateForChildModule } from "src/app/shared/modules";

import { ProfileComponent } from "./profile.component";

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    ProfileMaterialModule,
    TranslateForChildModule,
  ],
})
export class ProfileModule {}
