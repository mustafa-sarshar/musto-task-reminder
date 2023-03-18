import { Injectable, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { UtilityService } from "src/app/shared/services";
import { Task } from "src/app/shared/models";

@Injectable({
  providedIn: "root",
})
export class TasksListService implements OnInit {
  constructor(private utilityService: UtilityService) {}

  public ngOnInit(): void {}

  public initForm(tasks: Task[]): FormGroup {
    const formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: "",
          disabled: tasks && tasks.length === 0,
        },
        [
          Validators.maxLength(
            this.utilityService.getValidationLengthMax("TASK_TITLE")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_TITLE")
          ),
        ]
      ),
    });
    return formGroupEl;
  }
}
