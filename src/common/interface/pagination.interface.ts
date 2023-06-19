export interface PaginationResponse<T> {
  data: T[];
  meta: {
    page: number;
    perPage: number;
    totalItem: number;
  };
}
