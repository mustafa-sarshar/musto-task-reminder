import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatSnackBarModule } from "@angular/material/snack-bar";

const materials = [MatIconModule, MatButtonModule, MatSnackBarModule];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class WelcomePageMaterialModule {}
