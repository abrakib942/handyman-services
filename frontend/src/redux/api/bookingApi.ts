import { baseApi } from "./baseApi";

export const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/booking",
        params: arg,
        method: "GET",
      }),
      providesTags: ["addToBook"],
    }),
    getSingleBooking: build.query({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "GET",
      }),
      providesTags: ["addToBook"],
    }),
    addToBooking: build.mutation({
      query: (data) => ({
        url: "/booking/create",
        method: "POST",
        data,
      }),
      invalidatesTags: ["addToBook"],
    }),
    updateBooking: build.mutation({
      query: (data) => ({
        url: `/booking/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["addToBook"],
    }),
    deleteBooking: build.mutation({
      query: (id) => ({
        url: `/booking/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["addToBook"],
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
