import {
  fetchListings,
  fetchListing,
  createDraft,
  createAndPublish,
  updateListing,
  uploadListingPhotos,
  publishListing,
  deleteListing,
} from "@/services/api/listings";
import { apiClient } from "@/services/api/client";
import type {
  ListingsResponse,
  ListingResponse,
  CreateListingResponse,
  UpdateListingResponse,
  UploadListingPhotosResponse,
  PublishListingResponse,
  DeleteListingResponse,
} from "@/types/listing";

jest.mock("@/services/api/client", () => ({
  apiClient: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
  getStoredToken: jest.fn(),
  setStoredToken: jest.fn(),
}));

const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

const mockListing = {
  _id: "listing123",
  title: "iPhone 15 Pro",
  description: "Used like new",
  price: 1200,
  category: "Electronics",
  condition: "Used",
  images: ["https://example.com/img1.jpg"],
  seller: { _id: "user1", firstName: "Jane", lastName: "Doe" },
  status: "PUBLISHED",
};

describe("Listings API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchListings", () => {
    it("calls GET /listings and returns listings", async () => {
      const mockResponse: ListingsResponse = {
        status: "SUCCESS",
        listings: [mockListing],
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchListings();

      expect(mockedApiClient.get).toHaveBeenCalledWith("/listings");
      expect(result.listings).toHaveLength(1);
      expect(result.listings[0].title).toBe("iPhone 15 Pro");
    });

    it("passes filter params as query string", async () => {
      const mockResponse: ListingsResponse = {
        status: "SUCCESS",
        listings: [],
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      await fetchListings({ search: "phone", category: "Electronics" });

      expect(mockedApiClient.get).toHaveBeenCalledWith(
        "/listings?search=phone&category=Electronics",
      );
    });
  });

  describe("fetchListing", () => {
    it("calls GET /listings/:id and returns single listing", async () => {
      const mockResponse: ListingResponse = {
        status: "SUCCESS",
        listing: mockListing,
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchListing("listing123");

      expect(mockedApiClient.get).toHaveBeenCalledWith("/listings/listing123");
      expect(result.listing._id).toBe("listing123");
    });
  });

  describe("createDraft", () => {
    it("calls POST /listings/draft with data", async () => {
      const mockResponse: CreateListingResponse = {
        status: "SUCCESS",
        listing: { ...mockListing, status: "DRAFT" },
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await createDraft({
        title: "Camera",
        price: 50,
        category: "Electronics",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith("/listings/draft", {
        title: "Camera",
        price: 50,
        category: "Electronics",
      });
      expect(result.listing.status).toBe("DRAFT");
    });
  });

  describe("createAndPublish", () => {
    it("calls POST /listings/create-publish with full data", async () => {
      const mockResponse: CreateListingResponse = {
        status: "SUCCESS",
        listing: mockListing,
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await createAndPublish({
        title: "iPhone 15",
        description: "Sealed",
        price: 999,
        category: "Electronics",
        condition: "New",
        agreedToTerms: true,
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/listings/create-publish",
        expect.objectContaining({ title: "iPhone 15", price: 999 }),
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("updateListing", () => {
    it("calls PUT /listings/:id with update data", async () => {
      const mockResponse: UpdateListingResponse = {
        status: "SUCCESS",
        listing: { ...mockListing, condition: "Refurbished" },
      };

      mockedApiClient.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await updateListing("listing123", {
        condition: "Refurbished",
      });

      expect(mockedApiClient.put).toHaveBeenCalledWith("/listings/listing123", {
        condition: "Refurbished",
      });
      expect(result.listing.condition).toBe("Refurbished");
    });
  });

  describe("uploadListingPhotos", () => {
    it("calls POST /listings/:id/photos with FormData", async () => {
      const mockResponse: UploadListingPhotosResponse = {
        status: "SUCCESS",
        listing: mockListing,
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const formData = new FormData();
      const result = await uploadListingPhotos("listing123", formData);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/listings/listing123/photos",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("publishListing", () => {
    it("calls POST /listings/:id/publish with optional data", async () => {
      const mockResponse: PublishListingResponse = {
        status: "SUCCESS",
        listing: mockListing,
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await publishListing("listing123", {
        price: 5000,
        description: "Final description",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/listings/listing123/publish",
        { price: 5000, description: "Final description" },
      );
      expect(result.status).toBe("SUCCESS");
    });

    it("sends empty body when no data provided", async () => {
      const mockResponse: PublishListingResponse = {
        status: "SUCCESS",
        listing: mockListing,
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      await publishListing("listing123");

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/listings/listing123/publish",
        {},
      );
    });
  });

  describe("deleteListing", () => {
    it("calls DELETE /listings/:id", async () => {
      const mockResponse: DeleteListingResponse = {
        status: "SUCCESS",
        message: "Listing deleted",
      };

      mockedApiClient.delete.mockResolvedValueOnce({ data: mockResponse });

      const result = await deleteListing("listing123");

      expect(mockedApiClient.delete).toHaveBeenCalledWith(
        "/listings/listing123",
      );
      expect(result.status).toBe("SUCCESS");
    });
  });
});
