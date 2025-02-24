import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/auth",
        method: "GET",
      }),
    }),
  }),
});

const authApi2 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/register",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});
const authApi3 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    changePass: builder.mutation({
      query: (password) => ({
        url: "/auth/changePass",
        method: "POST",
        body: password,
      }),
    }),
  }),
});

const authApi4 = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: (payload: { id: string }) => ({
        url: "/auth/updateUser",
        method: "POST",
        body: payload, // Sending the entire object { id }
      }),
    }),
  }),
});

export const { useLoginMutation, useGetAllUserQuery } = authApi;
export const { useRegisterMutation } = authApi2;
export const { useChangePassMutation } = authApi3;
export const { useUpdateUserMutation } = authApi4;
