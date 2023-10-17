import { baseApi } from "./baseApi";

export const workTypeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllTypes: build.query({
      query: (arg: Record<string, any>) => ({
        url: "/workTypes",
        params: arg,
        method: "GET",
      }),
    }),
    getSingleType: build.query({
      query: (id) => ({
        url: `/workTypes/${id}`,
        method: "GET",
      }),
    }),
    createWorkType: build.mutation({
      query: (data) => ({
        url: "/workTypes/create",
        method: "POST",
        data,
      }),
    }),
    updateWorkType: build.mutation({
      query: (data) => ({
        url: `/workTypes/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
    }),
    deleteWorkType: build.mutation({
      query: (id) => ({
        url: `/workTypes/${id}`,
        method: "DELETE",
      }),
    }),
    getTypesByServiceId: build.query({
      query: (serviceId) => ({
        url: `/workTypes/${serviceId}`,
        method: "GET",
      }),
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
