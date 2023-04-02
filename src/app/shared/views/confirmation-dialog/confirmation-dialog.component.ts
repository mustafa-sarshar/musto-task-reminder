import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";

import { ConfirmationDialogBox } from "../../models/dialog/dialog.model";

@Component({
  selector: "app-confirmation-dialog",
  templateUrl: "./confirmation-dialog.component.html",
  styleUrls: ["./confirmation-dialog.component.scss"],
})
export class ConfirmationDialogComponent implements OnInit, OnDestroy {
  public confirmationDialogBox: ConfirmationDialogBox =
    new ConfirmationDialogBox();
  public dialogTitle: string = "";
  public dialogMessage: string = "";
  private translateSubscription?: Subscription;

  constructor(
    private translateService: TranslateService,
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>
  ) {}

  public ngOnInit(): void {
    this.translateSubscription = this.translateService
      .get(
        `CONFIRMATION_DIALOG.mode.${this.confirmationDialogBox.mode?.toLowerCase()}`
      )
      .subscribe((modeData) => {
        if (modeData) {
          this.dialogTitle = modeData.title;
          this.dialogMessage = modeData.message;
        }
      });
  }

  public ngOnDestroy(): void {
    this.translateSubscription?.unsubscribe();
  }

  public onClickDecline(): void {
    this.dialogRef.close(false);
  }

  public onClickAccept(): void {
    this.dialogRef.close(true);
  }
}
