export interface PaymentIntentDescription {
  userId: string;
  albumId: string;
}
export interface CreateStripeSession {
  toPay: number;
  currency: string;
  description: PaymentIntentDescription;
  productDescription: string;
}
export interface PaymentUrlResponse {
  url: string;
}
export interface PaymentUrlRequest {
  albumId: string;
  albumName: string;
}
