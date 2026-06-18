import { fetchMyStorefront, fetchStorefront, setupStorefront, updateStorefront } from "@/services/api/storefronts";
import { apiClient } from "@/services/api/client";
import type { StorefrontResponse, CreateStorefrontResponse, UpdateStorefrontResponse, StorefrontData } from "@/types/storefront";

jest.mock("@/services/api/client", () => ({ apiClient: { get: jest.fn(), post: jest.fn(), put: jest.fn() }, getStoredToken: jest.fn(), setStoredToken: jest.fn() }));
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

const mockStorefront = { _id: "store1", name: "My Store", description: "Best gadgets", logo: "https://example.com/logo.png", owner: "user1" };
const mockData: StorefrontData = {
  storeName: "My Store", storeDescription: "Best gadgets", logoUri: null, bannerUri: null,
  category: "Electronics", tags: ["tech"], contactEmail: "a@b.com", contactPhone: "123",
  instagram: "", twitter: "", whatsapp: "", address: "Lagos",
  operatingDays: ["Mon"], openTime: "9:00", closeTime: "17:00",
  returnPolicy: "30 days", shippingInfo: "Free", paymentMethods: ["Card"], storePhotos: [],
};

describe("Storefronts API Service", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("fetchMyStorefront calls GET /storefronts/me", async () => {
    const mock: StorefrontResponse = { status: "SUCCESS", storefront: mockStorefront };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchMyStorefront();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/storefronts/me");
    expect(result.storefront.name).toBe("My Store");
  });

  it("fetchStorefront calls GET /storefronts/:id", async () => {
    const mock: StorefrontResponse = { status: "SUCCESS", storefront: mockStorefront };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchStorefront("store1");
    expect(mockedApiClient.get).toHaveBeenCalledWith("/storefronts/store1");
    expect(result.storefront._id).toBe("store1");
  });

  it("setupStorefront calls POST /storefronts/setup", async () => {
    const mock: CreateStorefrontResponse = { status: "SUCCESS", storefront: mockStorefront };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await setupStorefront(mockData);
    expect(mockedApiClient.post).toHaveBeenCalledWith("/storefronts/setup", mockData);
    expect(result.status).toBe("SUCCESS");
  });

  it("updateStorefront calls PUT /storefronts", async () => {
    const mock: UpdateStorefrontResponse = { status: "SUCCESS", storefront: { ...mockStorefront, name: "Updated" } };
    mockedApiClient.put.mockResolvedValueOnce({ data: mock });
    const result = await updateStorefront(mockData);
    expect(mockedApiClient.put).toHaveBeenCalledWith("/storefronts", mockData);
    expect(result.storefront.name).toBe("Updated");
  });
});
