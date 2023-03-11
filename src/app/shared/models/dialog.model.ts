/**
 * @class
 * @description - It hold the data for generating the dialog box.
 */
export class ConfirmationDialogBox {
  /**
   * @constructor
   * @param title
   * @param message
   */
  constructor(public title: string, public message: string) {}
}

export type ConfirmationDialogType = "OK/CANCEL" | "YES/NO";
