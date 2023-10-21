import { StringShortenerPipe } from "./string-shortener.pipe";

describe("StringShortenerPipe", () => {
  it("create an instance", () => {
    const pipe = new StringShortenerPipe();
    expect(pipe).toBeTruthy();
  });
});
