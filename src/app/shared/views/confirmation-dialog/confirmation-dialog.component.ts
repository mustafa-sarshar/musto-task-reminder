import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { ConfirmationDialogBox } from "../../models/dialog/dialog.model";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  public confirmationDialogBox = new ConfirmationDialogBox("", "");
  private translateSubscription: Subscription = new Subscription();

  constructor(
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.translateSubscription = this.translateService
      .get("CONFIRMATION")
      .subscribe((translation) => {
        console.log(translation);
        if (translation.header) {
          // this.confirmationDialogBox.title = translation.header.title;
        }
      });
  }

  public ngOnDestroy(): void {
    this.translateSubscription.unsubscribe();
  }

  public onClickDecline(): void {
    this.dialogRef.close(false);
  }

  public onClickAccept(): void {
    this.dialogRef.close(true);
  }
}
