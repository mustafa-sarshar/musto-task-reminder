import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MatSidenavModule } from "@angular/material/sidenav";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatListModule } from "@angular/material/list";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";

import { TranslateForChildModule } from "../../modules";
import { FooterModule } from "../footer/footer.module";
import { AuthService, DataFlowService } from "../../services";
import { NavigationBarComponent } from "./navigation-bar.component";

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    FooterModule,
    TranslateForChildModule,
  ],
  providers: [AuthService, DataFlowService],
  exports: [NavigationBarComponent],
})
export class NavigationBarModule {}
