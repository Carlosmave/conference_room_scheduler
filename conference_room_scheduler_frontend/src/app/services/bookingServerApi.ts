import { IBookingParameter, IBookingResponse } from '../../interfaces/apis';
import { conferenceRoomSchedulerServerApi } from './conferenceRoomSchedulerServerApi';

export const extendedApiSlice =
  conferenceRoomSchedulerServerApi.injectEndpoints({
    endpoints: (builder) => ({
      getBookings: builder.query<IBookingResponse, IBookingParameter>({
        query: (object) => `bookings/?page=${object?.page || 1}`,
        providesTags: (result) =>
          result
            ? [
                ...result.results.map(({ id }: { id: number }) => ({
                  type: 'Booking' as const,
                  id,
                })),
                'Booking',
              ]
            : ['Booking'],
      }),
      createBooking: builder.mutation({
        query: (data) => ({
          url: `booking/bookings/`,
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['Booking'],
      }),
      deleteBooking: builder.mutation({
        query: (id) => ({
          url: `booking/bookings/${id}/`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Booking'],
      }),
      updateBooking: builder.mutation({
        query: ({ id, ...data }) => ({
          url: `booking/bookings/${id}/`,
          method: 'PUT',
          body: data,
        }),
        invalidatesTags: ['Booking'],
      }),
    }),
  });

export const {
  useGetBookingsQuery,
  useCreateBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = extendedApiSlice;
