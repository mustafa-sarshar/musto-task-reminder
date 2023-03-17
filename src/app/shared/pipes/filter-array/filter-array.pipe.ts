import { Pipe, PipeTransform } from "@angular/core";

/**
 * @class
 * @description - It filters the given array based on the given filter criteria
 */
@Pipe({
  name: "filterArray",
})
export class FilterArrayPipe implements PipeTransform {
  /**
   * @constructor
   * @param array
   * @param filterString
   * @param propName
   * @returns - Returns the filtered array
   */
  transform(array: any[], filterString: string, propName: string): any[] {
    const _filterString = filterString.trim().toLowerCase();
    const arrayFiltered = array.filter((item) =>
      item[propName].trim().toLowerCase().includes(_filterString)
    );

    return arrayFiltered;
  }
}
