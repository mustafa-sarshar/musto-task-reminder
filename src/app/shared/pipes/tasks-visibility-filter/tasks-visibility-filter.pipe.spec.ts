import { TasksVisibilityFilterPipe } from "./tasks-visibility-filter.pipe";

describe("TasksVisibilityFilterPipe", () => {
  it("create an instance", () => {
    const pipe = new TasksVisibilityFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
