import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllUser: build.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["updateUser", "user", "deleteUser"],
    }),
    getSingleUser: build.query({
      query: (userId) => ({
        url: `/user/${userId}`,
        method: "GET",
      }),
      providesTags: ["updateUser", "user", "deleteUser"],
    }),
    updateUser: build.mutation({
      query: (data) => ({
        url: `/user/${data.id}`,
        method: "PATCH",
        data: data.data,
      }),
      invalidatesTags: ["updateUser"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["deleteUser"],
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
