import { TokensResponse } from "./tokensResponse";

export interface LoginRegistrationModel {
  number: string;
  code: string;
}

export interface UserModel {
  client: {
    number: string;
    id: number;
    selfieUrl: string;
    name: string;
    email: string;
  };
}
export interface AuthResponse {
  tokens: TokensResponse;
  currentUser: UserModel;
}
export interface SetFullName {
  name: string;
}
export interface SetEmail {
  email: string;
}
export interface RequestUploadPhotoUrl {
  contentType: string;
}

interface Fields {
  Key: string;
  ContentType: string;
  bucket: string;
  "X-Amz-Algorithm": string;
  "X-Amz-Credential": string;
  "X-Amz-Date": string;
  "X-Amz-Security-Token": string;
  Policy: string;
  "X-Amz-Signature": string;
}

export interface UploadProfilePicUrlResponse {
  post: {
    url: string;
    fields: Fields;
  };
  accessUrl: string;
}

export interface RequestCode {
  phoneNumber: string;
}
