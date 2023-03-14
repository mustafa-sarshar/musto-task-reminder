import { TestBed } from "@angular/core/testing";

import { AppMonitoringService } from "./app-monitoring.service";

describe("AppMonitoringService", () => {
  let service: AppMonitoringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppMonitoringService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
