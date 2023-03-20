import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "stringShortener",
})
export class StringShortenerPipe implements PipeTransform {
  transform(
    value: string,
    maxLength: number,
    extension: string = " ..."
  ): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + extension;
    }
    return value;
  }
}
