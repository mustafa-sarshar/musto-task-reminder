export type SortByOptions =
  | "TITLE"
  | "DEADLINE"
  | "DONE_AT_DATE"
  | "NO_SORTING";

export type SortByType = "ASC" | "DES";

export class SortBy {
  constructor(
    public sortByOption: SortByOptions,
    public sortByType: SortByType
  ) {}
}
