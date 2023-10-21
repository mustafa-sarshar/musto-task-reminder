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
}

export class TaskReminder {
  constructor(public trid: string, public task: Task) {}
}
