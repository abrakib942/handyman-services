import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

export const workTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTypes: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/workTypes",
        params: arg,
        method: "GET",
      }),
      providesTags: [tagTypes.workType],
    }),
    getSingleType: build.query({
      query: (id) => ({
        url: `/workTypes/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workType],
    }),
    createWorkType: build.mutation({
      query: (data) => ({
        url: "/workTypes/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.workType],
    }),
    updateWorkType: build.mutation({
      query: (data) => ({
        url: `/workTypes/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: [tagTypes.workType],
    }),
    deleteWorkType: build.mutation({
      query: (id) => ({
        url: `/workTypes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.workType],
    }),
    getTypesByServiceId: build.query({
      query: (serviceId) => ({
        url: `/workTypes/${serviceId}`,
        method: "GET",
      }),
      providesTags: [tagTypes.workType],
    }),
  }),
});

export const {
  useCreateWorkTypeMutation,
  useGetAllTypesQuery,
  useGetSingleTypeQuery,
  useGetTypesByServiceIdQuery,
  useUpdateWorkTypeMutation,
  useDeleteWorkTypeMutation,
} = workTypeApi;
