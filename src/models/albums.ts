import { PhotoResponse } from "./photo";

export interface AlbumModel {
  paid: boolean;
  name: string;
  date: string;
  id: number;
  location: string;
}
export interface AlbumDetails {
  album: {
    date: string;
    id: number;
    name: string;
    location: string;
    photographerId: number;
    paid: boolean;
  };
  image: {
    url: string;
    preview: string;
  };
}
export interface AlbumWithPhotos {
  album: AlbumModel;
  images: PhotoResponse[];
}
