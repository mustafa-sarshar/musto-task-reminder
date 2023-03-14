export type LogType = "INFO" | "ERROR" | "WARN" | "";
export type NotificationType = "ERROR" | "SUCCESS" | "WARN";
export type NotificationActionType = "OK";

export class Log {
  constructor(public message: string | any, public type: LogType = "") {}
}

export class Notification {
  constructor(
    public message: string,
    public type: NotificationType,
    public action: NotificationActionType = "OK",
    public duration: number = 2000
  ) {}
}
