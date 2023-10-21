import { TasksFilterPipe } from "./tasks-filter.pipe";

describe("FilterArrayPipe", () => {
  it("create an instance", () => {
    const pipe = new TasksFilterPipe();
    expect(pipe).toBeTruthy();
  });
});
