import { NgModule } from "@angular/core";

import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTooltipModule } from "@angular/material/tooltip";

const materials = [MatDialogModule, MatSnackBarModule, MatTooltipModule];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class AppMaterialModule {}
