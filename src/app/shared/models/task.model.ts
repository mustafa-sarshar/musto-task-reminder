export class Task {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public deadline: Date,
    public done: boolean,
    public doneAtDate?: Date,
    public doneBy?: string
  ) {}

  public doneReport() {
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
