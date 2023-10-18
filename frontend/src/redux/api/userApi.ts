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
      query: (userId) => ({
        url: `/user/${userId}`,
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
    getUserProfile: build.query({
      query: () => ({
        url: "/user/user-profile",
        // params: { role, userId },
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetUserProfileQuery,
} = userApi;
