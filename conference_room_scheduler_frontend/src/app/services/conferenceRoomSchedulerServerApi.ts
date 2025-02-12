import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: `${import.meta.env.VITE_API_URL}/api/`,
});

export const conferenceRoomSchedulerServerApi = createApi({
  reducerPath: 'conferenceRoomSchedulerServerApi',
  baseQuery: baseQuery,
  tagTypes: ['Booking'],
  endpoints: () => ({}),
});
