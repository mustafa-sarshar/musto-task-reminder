export type ConfirmationDialogType = "OK/CANCEL" | "YES/NO";
export type ConfirmationDialogModes =
  | "LOGOUT"
  | "LEAVE_PAGE"
  | "DELETE_ACCOUNT"
  | "DELETE_ALL_TASKS"
  | "DELETE_TASK"
  | "DELETE_TASK_REMINDER"
  | "FINISH_THE_TASK"
  | "OPEN_THE_TASK";

export class ConfirmationDialogBox {
  constructor(
    public mode?: ConfirmationDialogModes,
    public type?: ConfirmationDialogType
  ) {}
}
