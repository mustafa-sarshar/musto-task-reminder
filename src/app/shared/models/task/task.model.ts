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
    public reminder?: Date,
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

export class TaskReminder {
  constructor(public trid: string, public task: Task) {}
}
