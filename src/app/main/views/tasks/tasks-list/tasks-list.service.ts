import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { UtilityService } from "src/app/shared/services";
import { Task } from "src/app/shared/models";

@Injectable()
export class TasksListService {
  constructor(private utilityService: UtilityService) {}

  public initForm(tasks: Task[]): FormGroup {
    const formGroupEl = new FormGroup({
      title: new FormControl(
        {
          value: "",
          disabled: tasks && tasks.length === 0,
        },
        [
          Validators.maxLength(
            this.utilityService.getValidationMax("TASK_TITLE")
          ),
          Validators.pattern(
            this.utilityService.getValidationPattern("TASK_TITLE")
          ),
        ]
      ),
    });
    return formGroupEl;
  }

  public updatePaginatorButtons(paginationSettings: any): void {
    if (paginationSettings.pageIndex > 0) {
      paginationSettings.disabledPrev = false;
    } else {
      paginationSettings.disabledPrev = true;
    }
    if (
      paginationSettings.pageIndex >=
      Math.floor(paginationSettings.length / paginationSettings.pageSize)
    ) {
      paginationSettings.disabledNext = true;
    } else {
      paginationSettings.disabledNext = false;
    }
  }
}
