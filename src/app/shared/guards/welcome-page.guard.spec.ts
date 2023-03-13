import { TestBed } from "@angular/core/testing";

import { WelcomePageGuard } from "./welcome-page.guard";

describe("WelcomePageGuard", () => {
  let guard: WelcomePageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WelcomePageGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
