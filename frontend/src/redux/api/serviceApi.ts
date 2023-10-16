import { baseApi } from "./baseApi";

export const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllServices: build.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
    }),
    getSingleService: build.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
    }),
    createService: build.mutation({
      query: (data) => ({
        url: "/services/create-service",
        method: "POST",
        data,
      }),
    }),
    updateService: build.mutation({
      query: (data) => ({
        url: `/services/${data.id}`,
        method: "POST",
        data: data.data,
      }),
    }),
    deleteService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllServicesQuery,
  useCreateServiceMutation,
  useGetSingleServiceQuery,
  useDeleteServiceMutation,
} = serviceApi;
