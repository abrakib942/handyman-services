import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServices: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/services",
        params: arg,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    getSingleService: build.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),
    createService: build.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `/services/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.service],
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
  useUpdateServiceMutation,
} = serviceApi;
