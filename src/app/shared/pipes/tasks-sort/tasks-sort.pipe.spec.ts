import { TasksSortPipe } from "./tasks-sort.pipe";

describe("TasksSortPipe", () => {
  it("create an instance", () => {
    const pipe = new TasksSortPipe();
    expect(pipe).toBeTruthy();
  });
});
