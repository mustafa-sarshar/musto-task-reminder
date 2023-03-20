import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";

import { LanguageComponent } from "./language.component";

@NgModule({
  declarations: [LanguageComponent],
  imports: [CommonModule, MatCardModule, MatButtonModule],
  exports: [LanguageComponent],
})
export class LanguageModule {}
