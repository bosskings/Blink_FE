export interface Bank {
  name: string;
  code: string;
}

export interface InitializePaymentRequest {
  listingId: string;
}

export interface InitializePaymentResponse {
  status: string;
  authorization_url?: string;
  reference?: string;
}

export interface VerifyPaymentRequest {
  reference: string;
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  transaction?: Record<string, unknown>;
}

export interface BanksResponse {
  status: string;
  banks: Bank[];
}

export interface VerifyAccountParams {
  accountNumber: string;
  bankCode: string;
}

export interface VerifyAccountResponse {
  status: string;
  accountName: string;
}

export interface ConfirmPickupRequest {
  transactionId: string;
  pickupCode: string;
}

export interface ConfirmPickupResponse {
  status: string;
  message: string;
}
