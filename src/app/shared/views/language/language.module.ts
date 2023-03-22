import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";

import { TranslateForChildModule } from "../../modules";
import { LanguageComponent } from "./language.component";

@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    TranslateForChildModule,
  ],
  exports: [LanguageComponent],
})
export class LanguageModule {}
