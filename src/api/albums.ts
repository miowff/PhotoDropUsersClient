import { AlbumDetails, AlbumModel, AlbumWithPhotos } from "../models/albums";
import { PaymentUrlRequest, PaymentUrlResponse } from "../models/payments";
import { apiSlice } from "./api";

export const albumsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUserAlbums: builder.query<AlbumModel[], void>({
      query: () => ({
        url: "/getAlbums",
        method: "GET",
      }),
    }),
    getAlbumWithPhotos: builder.query<AlbumWithPhotos, string>({
      query: (albumId) => ({
        url: `/getImagesByAlbumClient?albumId=${albumId}`,
        method: "GET",
      }),
    }),
    getAlbumInfo: builder.query<AlbumDetails, string>({
      query: (albumId) => ({
        url: `/getDetailedAlbum?albumId=${albumId}`,
        method: "GET",
      }),
    }),
    getPaymentUrl: builder.query<PaymentUrlResponse, PaymentUrlRequest>({
      query: ({ albumId, albumName }) => ({
        url: `/getPaymentLink?albumId=${albumId}&albumName=${albumName}`,
        method: "GET",
      }),
    }),
  }),
});
export const {
  useGetAllUserAlbumsQuery,
  useGetAlbumWithPhotosQuery,
  useLazyGetPaymentUrlQuery,
  useGetAlbumInfoQuery,
} = albumsApi;
