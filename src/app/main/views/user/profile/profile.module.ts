import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { ProfileComponent } from "./profile.component";
import { ProfileRoutingModule } from "./profile-routing.module";
import { ProfileMaterialModule } from "./profile-material.module";

import { TranslateForChildModule } from "src/app/shared/modules";

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
