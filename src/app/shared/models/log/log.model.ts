export type LogType = "INFO" | "ERROR" | "WARN" | "";
export type NotificationId =
  | "LOGIN"
  | "REGISTRATION"
  | "SYNC_DATA"
  | "DELETE_ACCOUNT"
  | "UPDATE_ACCOUNT"
  | "DELETE_TASK"
  | "UPDATE_TASK"
  | "ADD_TASK"
  | "DELETE_ALL_TASKS"
  | "DELETE_USER_DATA"
  | "UPDATE_USER_DATA"
  | "SET_APP_LANGUAGE";
export type NotificationType = "ERROR" | "SUCCESS" | "WARN";
export type NotificationActionType = "OK";

export class Log {
  constructor(public message: string | any, public type: LogType = "") {}
}

export class Notification {
  constructor(
    public nid: NotificationId,
    public type: NotificationType,
    public action: NotificationActionType = "OK",
    public duration: number = 2000
  ) {}
}
