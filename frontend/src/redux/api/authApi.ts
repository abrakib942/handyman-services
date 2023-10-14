import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignUp: build.mutation({
      query: (data) => ({
        url: `auth/signup`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),
    userLogin: build.mutation({
      query: (data) => ({
        url: `auth/signin`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserLoginMutation } = authApi;
