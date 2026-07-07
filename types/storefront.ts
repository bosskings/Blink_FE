export interface Storefront {
  _id: string;
  id?: string;
  name: string;
  storeName?: string;
  description?: string;
  storeDescription?: string;
  logo?: string;
  logoUri?: string;
  banner?: string;
  bannerUri?: string;
  owner?: string;
  category?: string;
  tags?: string[];
  contactEmail?: string;
  contactPhone?: string;
  instagram?: string;
  twitter?: string;
  whatsapp?: string;
  address?: string;
  operatingDays?: string[];
  openTime?: string;
  closeTime?: string;
  returnPolicy?: string;
  shippingInfo?: string;
  paymentMethods?: string[];
  photos?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface StorefrontData {
  storeName: string;
  storeDescription: string;
  logoUri: string | null;
  bannerUri: string | null;
  category: string;
  tags: string[];
  contactEmail: string;
  contactPhone: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
  address: string;
  operatingDays: string[];
  openTime: string;
  closeTime: string;
  returnPolicy: string;
  shippingInfo: string;
  paymentMethods: string[];
  storePhotos: string[];
}

export interface StorefrontResponse {
  status: string;
  storefront: Storefront;
}

export interface CreateStorefrontResponse {
  status: string;
  storefront: Storefront;
}

export interface UpdateStorefrontRequest {
  name?: string;
  description?: string;
}

export interface UpdateStorefrontResponse {
  status: string;
  storefront: Storefront;
}
