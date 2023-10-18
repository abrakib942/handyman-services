import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/booking",
        params: arg,
        method: "GET",
      }),
    }),
    getSingleBooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
    }),
    addToBooking: build.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        data,
      }),
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `/booking/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddToBookingMutation,
  useGetAllBookingsQuery,
  useGetSingleBookingQuery,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
