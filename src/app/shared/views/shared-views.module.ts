import { NgModule } from "@angular/core";

import { LoadingSpinnerModule } from "./loading-spinner/loading-spinner.module";
import { ConfirmationDialogModule } from "./confirmation-dialog/confirmation-dialog.module";
import { FooterModule } from "./footer/footer.module";
import { LanguageModule } from "./language/language.module";
import { NavigationBarModule } from "./navigation-bar/navigation-bar.module";
import { TranslateForChildModule } from "../modules";

const sharedViews = [
  ConfirmationDialogModule,
  FooterModule,
  LanguageModule,
  LoadingSpinnerModule,
  NavigationBarModule,
];

@NgModule({
  declarations: [],
  imports: [sharedViews],
  exports: [sharedViews],
})
export class SharedViewsModule {}
