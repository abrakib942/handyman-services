import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/booking",
        params: arg,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    getSingleBooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.booking],
    }),
    addToBooking: build.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `/booking/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.booking],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.booking],
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
