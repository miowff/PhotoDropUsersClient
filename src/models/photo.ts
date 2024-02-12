export interface PhotoExample {
  fullPhotoAccessLink: string;
  previewBase64?: string;
  isActivated: boolean;
  albumId?: string;
  albumTitle?: string;
  photoName: string;
}
export interface PhotoResponse {
  fullPhotoAccessLink: string;
  previewBase64: string;
  isActivated: boolean;
  albumId: string;
  albumTitle: string;
  photoName: string;
}
