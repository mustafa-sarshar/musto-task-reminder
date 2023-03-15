import { NgModule } from "@angular/core";

import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTreeModule } from "@angular/material/tree";
import { MatSelectModule } from "@angular/material/select";

/**
 * @constant
 * @description - It holds all necessary Material Design components needed for the app.
 */
const materials = [
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatDialogModule,
  MatSnackBarModule,
  MatIconModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatTooltipModule,
  MatExpansionModule,
  MatSidenavModule,
  MatListModule,
  MatPaginatorModule,
  MatTreeModule,
  MatSelectModule,
];

@NgModule({
  imports: [materials],
  exports: [materials],
})
export class AppMaterialModule {}
