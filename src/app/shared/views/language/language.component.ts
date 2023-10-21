import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

import { DataFlowService } from "../../services";
import { LanguageCode } from "../../models";

@Component({
  selector: "app-language",
  templateUrl: "./language.component.html",
  styleUrls: ["./language.component.scss"],
})
export class LanguageComponent implements OnInit {
  public currentAppLanguage: LanguageCode = "en-US";

  constructor(
    private dataFlowService: DataFlowService,
    private dialogRef: MatDialogRef<LanguageComponent>
  ) {}

  public ngOnInit(): void {
    this.currentAppLanguage = this.dataFlowService.getAppLanguage();
  }

  onClickEnglish(): void {
    this.dataFlowService.setAppLanguage("en-US");
    this.dataFlowService.applyAppLanguage();
    this.dialogRef.close();
  }

  onClickGerman(): void {
    this.dataFlowService.setAppLanguage("de-DE");
    this.dataFlowService.applyAppLanguage();
    this.dialogRef.close();
  }

  onClickTurkish(): void {
    this.dataFlowService.setAppLanguage("tr-TR");
    this.dataFlowService.applyAppLanguage();
    this.dialogRef.close();
  }

  onClickPersian(): void {
    this.dataFlowService.setAppLanguage("fa-IR");
    this.dataFlowService.applyAppLanguage();
    this.dialogRef.close();
  }
}
