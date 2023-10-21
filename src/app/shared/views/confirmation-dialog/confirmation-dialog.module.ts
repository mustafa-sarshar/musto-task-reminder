import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { TranslateForChildModule } from "../../modules";
import { ConfirmationDialogComponent } from "./confirmation-dialog.component";

@NgModule({
  declarations: [ConfirmationDialogComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    TranslateForChildModule,
  ],
  exports: [ConfirmationDialogComponent],
})
export class ConfirmationDialogModule {}
