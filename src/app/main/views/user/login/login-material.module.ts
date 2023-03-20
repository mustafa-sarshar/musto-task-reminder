import { NgModule } from "@angular/core";

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";

/**
 * @constant
 * @description - It holds all necessary Material Design components needed for the component.
 */
const materials = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSnackBarModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class LoginMaterialModule {}
