import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
