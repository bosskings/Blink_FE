export interface ListingLocation {
  type: string;
  coordinates: [number, number];
  city: string;
  state?: string;
  town?: string;
}

export interface ListingSeller {
  _id: string;
  firstName: string;
  lastName: string;
  blinkTag?: string;
  avatar?: string;
}

export interface Listing {
  _id: string;
  title: string;
  description?: string;
  price: number;
  type?: string;
  transactionType?: string;
  category?: string;
  condition?: string;
  images: string[];
  seller: ListingSeller;
  status: string;
  location?: ListingLocation;
  communities?: string[];
  pickupOption?: string;
  availabilitySchedule?: string;
  listingDuration?: string;
  agreedToTerms?: boolean;
  distance?: string;
  timePosted?: string;
  tag?: string;
  isPromoted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ListingsResponse {
  status: string;
  listings: Listing[];
}

export interface ListingResponse {
  status: string;
  listing: Listing;
}

export interface ListingsFilter {
  search?: string;
  type?: string;
  category?: string;
  communityId?: string;
  status?: string;
  userId?: string;
}

export interface CreateDraftRequest {
  title: string;
  description?: string;
  price: number;
  type?: string;
  category?: string;
  condition?: string;
  location?: ListingLocation;
}

export interface CreateAndPublishRequest {
  title: string;
  description: string;
  price: number;
  type?: string;
  transactionType?: string;
  category?: string;
  condition?: string;
  communities?: string[];
  pickupOption?: string;
  availabilitySchedule?: string;
  listingDuration?: string;
  agreedToTerms?: boolean;
  location?: ListingLocation;
  images?: string[];
}

export interface UpdateListingRequest {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
  condition?: string;
  pickupOption?: string;
  agreedToTerms?: boolean;
}

export interface PublishListingRequest {
  price?: number;
  category?: string;
  condition?: string;
  description?: string;
}

export interface CreateListingResponse {
  status: string;
  listing: Listing;
}

export interface UpdateListingResponse {
  status: string;
  listing: Listing;
}

export interface UploadListingPhotosResponse {
  status: string;
  listing: Listing;
}

export interface PublishListingResponse {
  status: string;
  listing: Listing;
}

export interface DeleteListingResponse {
  status: string;
  message: string;
}
