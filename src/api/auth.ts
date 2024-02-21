import { LoginRegistrationModel, UserModel } from "../models/user";
import { apiSlice } from "./api";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    loginOrRegister: builder.mutation<string, LoginRegistrationModel>({
      query: (userData) => ({
        url: "/auth/verifyCode",
        method: "POST",
        body: userData,
      }),
    }),
    getCurrentUser: builder.query<UserModel, void>({
      query: () => ({
        url: "",
        method: "GET",
      }),
    }),
    resendCode: builder.mutation<string, string>({
      query: (number) => ({
        url: "/auth/sendCode",
        method: "POST",
        body: { number },
      }),
    }),
    requestCode: builder.mutation<string, string>({
      query: (number) => ({
        url: "/auth/sendCode",
        method: "POST",
        body: { number:`+${number}` },
      }),
    }),
  }),
});
export const {
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLoginOrRegisterMutation,
  useRequestCodeMutation,
  useResendCodeMutation,
} = authApi;
