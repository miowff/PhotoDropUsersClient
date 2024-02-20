/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  RequestUploadPhotoUrl,
  UploadProfilePicUrlResponse,
} from "../models/user";
import { apiSlice } from "./api";

const apiWithTags = apiSlice.enhanceEndpoints({ addTagTypes: ["User"] });
export const userApi = apiWithTags.injectEndpoints({
  endpoints: (builder) => ({
    setFullName: builder.mutation({
      query: (name: string) => ({
        url: `/updateName?name=${name}`,
        method: "PUT",
      }),
      // @ts-ignore
      invalidatesTags: [{ type: "User" }],
    }),
    setEmail: builder.mutation({
      query: (email: string) => ({
        url: `/updateEmail?email=${email}`,
        method: "PUT",
        body: email,
      }),
      // @ts-ignore
      providesTags: [{ type: "User" }],
    }),
    getUploadProfilePicUrl: builder.query<
      UploadProfilePicUrlResponse,
      RequestUploadPhotoUrl
    >({
      query: (request: RequestUploadPhotoUrl) => ({
        url: "/selfiesPresignedPost",
        method: "POST",
        body: request,
      }),
    }),
  }),
});
export const {
  useSetFullNameMutation,
  useSetEmailMutation,
  useLazyGetUploadProfilePicUrlQuery,
} = userApi;
