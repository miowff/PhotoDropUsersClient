import { PhotoResponse } from "../models/photo";
import { apiSlice } from "./api";

export const photosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserPhotos: builder.query<PhotoResponse[], void>({
      query: () => ({
        url: "/getImages",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllUserPhotosQuery } = photosApi;
