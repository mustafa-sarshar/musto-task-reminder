import { FilterArrayPipe } from "./tasks-filter.pipe";

describe("FilterArrayPipe", () => {
  it("create an instance", () => {
    const pipe = new FilterArrayPipe();
    expect(pipe).toBeTruthy();
  });
});
