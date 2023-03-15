export class TaskGroup {
  constructor(public gid: string, public title: string) {}
}

export class Task {
  constructor(
    public tid: string,
    public title: string,
    public group: TaskGroup,
    public deadline: Date,
    public description?: string,
    public webLink?: string,
    public imageLink?: string,
    public videoLink?: string,
    public voiceLink?: string,
    public done?: boolean,
    public doneAtDate?: Date,
    public doneBy?: string
  ) {}

  public report() {
    if (this.done) {
      if (this.doneAtDate && this.doneBy) {
        return `Done at ${this.doneAtDate.toUTCString()} by ${this.doneBy}`;
      } else if (this.doneAtDate && !this.doneBy) {
        return `Done at ${this.doneAtDate.toUTCString()}`;
      } else {
        return `Done at ${this.deadline.toUTCString()}`;
      }
    } else {
      return `May be done till ${this.deadline.toUTCString()}`;
    }
  }
}
