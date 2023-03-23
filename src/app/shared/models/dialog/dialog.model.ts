export type ConfirmationDialogType = "OK/CANCEL" | "YES/NO";
export type ConfirmationDialogModes =
  | "LOGOUT"
  | "DELETE_ACCOUNT"
  | "DELETE_ALL_TASKS"
  | "DELETE_TASK"
  | "LEAVE_PAGE"
  | "FINISH_THE_TASK"
  | "OPEN_THE_TASK";

export class ConfirmationDialogBox {
  constructor(
    public mode?: ConfirmationDialogModes,
    public type?: ConfirmationDialogType
  ) {}
}
