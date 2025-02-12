export interface IBooking {
  id: number;
  name: string;
  startDateTime: string;
  endDateTime: string;
}

export interface IBookingResponse {
  next: string | null;
  previous: string | null;
  count: number;
  currentPage: number;
  totalPages: number;
  pageSize: number;
  results: IBooking[];
}

export interface IBookingParameter {
  page: number;
}
