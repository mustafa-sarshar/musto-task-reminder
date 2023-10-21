import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { TranslateForChildModule } from "../../modules";
import { LoadingSpinnerComponent } from "./loading-spinner.component";

@NgModule({
  declarations: [LoadingSpinnerComponent],
  imports: [CommonModule, TranslateForChildModule],
  exports: [LoadingSpinnerComponent],
})
export class LoadingSpinnerModule {}
