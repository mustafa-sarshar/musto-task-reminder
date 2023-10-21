import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TaskReminderPopupComponent } from "./task-reminder-popup.component";

describe("TaskReminderPopupComponent", () => {
  let component: TaskReminderPopupComponent;
  let fixture: ComponentFixture<TaskReminderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskReminderPopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskReminderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
