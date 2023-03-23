import { Time } from "@angular/common";

export class TaskGroup {
  constructor(public gid: string, public title: string) {}
}

export class Task {
  constructor(
    public tid: string,
    public title: string,
    public group: TaskGroup,
    public deadlineDate: Date,
    public deadlineTime?: Time,
    public remindMe?: boolean,
    public reminderDays?: number,
    public reminderMinutes?: number,
    public description?: string,
    public webLink?: string,
    public imageLink?: string,
    public videoLink?: string,
    public voiceLink?: string,
    public done?: boolean,
    public completedDate?: Date,
    public completedTime?: Time,
    public completedBy?: string
  ) {}

  public report() {
    if (this.done) {
      if (this.completedDate && this.completedBy) {
        return `Done at ${this.completedDate.toUTCString()} by ${
          this.completedBy
        }`;
      } else if (this.completedDate && !this.done) {
        return `Done at ${this.completedDate.toUTCString()}`;
      } else {
        return `Done at ${this.deadlineDate.toUTCString()}`;
      }
    } else {
      return `May be done till ${this.deadlineDate.toUTCString()}`;
    }
  }
}
