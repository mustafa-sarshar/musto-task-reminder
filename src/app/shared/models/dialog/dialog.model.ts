export type ConfirmationDialogType = "OK/CANCEL" | "YES/NO";

export class ConfirmationDialogBox {
  constructor(
    public title: string,
    public message: string,
    public dialogType?: ConfirmationDialogType
  ) {}
}
