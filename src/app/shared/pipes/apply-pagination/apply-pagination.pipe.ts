import { Pipe, PipeTransform } from "@angular/core";
import { Task } from "../../models";

@Pipe({
  name: "applyPagination",
})
export class ApplyPaginationPipe implements PipeTransform {
  transform(
    tasks: Task[],
    paginationPageSize: number,
    paginationPageIndex: number
  ): Task[] {
    return tasks.slice(
      paginationPageIndex * paginationPageSize,
      paginationPageIndex * paginationPageSize + paginationPageSize
    );
  }
}
