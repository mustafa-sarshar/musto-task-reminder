import { Time } from "@angular/common";

export class TaskGroup {
  constructor(public gid: string, public title: string) {}
}

export class Task {
  constructor(
    public tid: string,
    public title: string,
    public group: TaskGroup,
    public deadline: Date,
    public remindMe?: boolean,
    public reminderDays?: number,
    public reminderMinutes?: number,
    public description?: string,
    public webLink?: string,
    public imageLink?: string,
    public videoLink?: string,
    public voiceLink?: string,
    public done?: boolean,
    public completion?: Date
  ) {}

  public report() {
    if (this.done) {
      if (this.completion) {
        return `Done at ${this.completion.toUTCString()}`;
      } else if (this.completion && !this.done) {
        return `Done at ${this.completion.toUTCString()}`;
      } else {
        return `Done at ${this.deadline.toUTCString()}`;
      }
    } else {
      return `May be done till ${this.deadline.toUTCString()}`;
    }
  }
}
