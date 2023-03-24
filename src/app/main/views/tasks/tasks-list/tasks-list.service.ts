import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { LogService, UtilityService } from "src/app/shared/services";
import { Log, Task } from "src/app/shared/models";

@Injectable()
export class TasksListService {
  constructor(
    private utilityService: UtilityService,
    private logService: LogService
  ) {}

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
    if (
      paginationSettings.pageIndex === 0 ||
      paginationSettings.pageIndex === undefined
    ) {
      paginationSettings.disabledPrev = true;
    } else {
      paginationSettings.disabledPrev = false;
    }
    if (paginationSettings.length > paginationSettings.pageSize) {
      paginationSettings.disabledNext = false;
    } else {
      paginationSettings.disabledNext = true;
    }
    if (
      paginationSettings.pageIndex ===
      Math.floor(paginationSettings.length / paginationSettings.pageSize)
    ) {
      paginationSettings.disabledNext = true;
    }

    this.logService.logToConsole(
      new Log("Pagination Setting Changed!", "INFO")
    );
    this.logService.logToConsole(new Log(paginationSettings));
  }
}
