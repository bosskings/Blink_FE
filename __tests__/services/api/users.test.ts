import {
  fetchCurrentUser,
  updateCurrentUser,
  uploadAvatar,
  updateBlinkTag,
  setPayoutSettings,
  fetchUser,
  deleteAccount,
  fetchSavedListings,
  saveListing,
} from "@/services/api/users";
import { apiClient } from "@/services/api/client";
import type {
  UserProfileResponse,
  UpdateProfileResponse,
  UploadAvatarResponse,
  UpdateBlinkTagResponse,
  PayoutSettingsResponse,
  DeleteAccountResponse,
  SavedListingsResponse,
  SaveListingResponse,
} from "@/types/user";

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

describe("Users API Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("fetchCurrentUser", () => {
    it("calls GET /users/me and returns user profile", async () => {
      const mockResponse: UserProfileResponse = {
        status: "SUCCESS",
        user: {
          _id: "user123",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: false,
          blinkTag: "johndoe",
        },
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchCurrentUser();

      expect(mockedApiClient.get).toHaveBeenCalledWith("/users/me");
      expect(result.user.firstName).toBe("John");
      expect(result.user.blinkTag).toBe("johndoe");
    });
  });

  describe("updateCurrentUser", () => {
    it("calls PUT /users/me with update data", async () => {
      const mockResponse: UpdateProfileResponse = {
        status: "SUCCESS",
        user: {
          _id: "user123",
          firstName: "Updated",
          lastName: "Name",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: false,
          bio: "New bio",
        },
      };

      mockedApiClient.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await updateCurrentUser({
        firstName: "Updated",
        lastName: "Name",
        bio: "New bio",
      });

      expect(mockedApiClient.put).toHaveBeenCalledWith("/users/me", {
        firstName: "Updated",
        lastName: "Name",
        bio: "New bio",
      });
      expect(result.user.firstName).toBe("Updated");
    });
  });

  describe("uploadAvatar", () => {
    it("calls POST /users/me/avatar with FormData", async () => {
      const mockResponse: UploadAvatarResponse = {
        status: "SUCCESS",
        user: {
          _id: "user123",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: false,
          avatar: "https://cdn.example.com/avatars/user123.jpg",
        },
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const formData = new FormData();
      const result = await uploadAvatar(formData);

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/users/me/avatar",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } },
      );
      expect(result.user.avatar).toBe("https://cdn.example.com/avatars/user123.jpg");
    });
  });

  describe("updateBlinkTag", () => {
    it("calls PUT /users/me/blink-tag with blinkTag", async () => {
      const mockResponse: UpdateBlinkTagResponse = {
        status: "SUCCESS",
        user: {
          _id: "user123",
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          phone: "+2341234567890",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: false,
          blinkTag: "super-user",
        },
      };

      mockedApiClient.put.mockResolvedValueOnce({ data: mockResponse });

      const result = await updateBlinkTag({ blinkTag: "super-user" });

      expect(mockedApiClient.put).toHaveBeenCalledWith(
        "/users/me/blink-tag",
        { blinkTag: "super-user" },
      );
      expect(result.user.blinkTag).toBe("super-user");
    });
  });

  describe("setPayoutSettings", () => {
    it("calls POST /users/me/payout-settings with bank details", async () => {
      const mockResponse: PayoutSettingsResponse = {
        status: "SUCCESS",
        message: "Payout settings saved",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await setPayoutSettings({
        bankName: "Access Bank",
        bankCode: "044",
        accountNumber: "0001234567",
      });

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/users/me/payout-settings",
        { bankName: "Access Bank", bankCode: "044", accountNumber: "0001234567" },
      );
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("fetchUser", () => {
    it("calls GET /users/:userId and returns user data", async () => {
      const mockResponse: UserProfileResponse = {
        status: "SUCCESS",
        user: {
          _id: "user456",
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@example.com",
          phone: "+2349876543210",
          role: "USER",
          isSuspended: false,
          emailVerified: true,
          phoneVerified: true,
          blinkTag: "janesmith",
        },
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchUser("user456");

      expect(mockedApiClient.get).toHaveBeenCalledWith("/users/user456");
      expect(result.user.firstName).toBe("Jane");
    });
  });

  describe("deleteAccount", () => {
    it("calls DELETE /users/me", async () => {
      const mockResponse: DeleteAccountResponse = {
        status: "SUCCESS",
        message: "Account deleted",
      };

      mockedApiClient.delete.mockResolvedValueOnce({ data: mockResponse });

      const result = await deleteAccount();

      expect(mockedApiClient.delete).toHaveBeenCalledWith("/users/me");
      expect(result.status).toBe("SUCCESS");
    });
  });

  describe("fetchSavedListings", () => {
    it("calls GET /users/me/saved-listings and returns listings", async () => {
      const mockResponse: SavedListingsResponse = {
        status: "SUCCESS",
        savedListings: [
          { _id: "listing1", title: "iPhone 15", price: 1000 },
          { _id: "listing2", title: "MacBook Pro", price: 2500 },
        ],
      };

      mockedApiClient.get.mockResolvedValueOnce({ data: mockResponse });

      const result = await fetchSavedListings();

      expect(mockedApiClient.get).toHaveBeenCalledWith("/users/me/saved-listings");
      expect(result.savedListings).toHaveLength(2);
      expect(result.savedListings[0].title).toBe("iPhone 15");
    });
  });

  describe("saveListing", () => {
    it("calls POST /users/me/saved-listings/:listingId", async () => {
      const mockResponse: SaveListingResponse = {
        status: "SUCCESS",
        message: "Listing saved",
      };

      mockedApiClient.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await saveListing("listing1");

      expect(mockedApiClient.post).toHaveBeenCalledWith(
        "/users/me/saved-listings/listing1",
        {},
      );
      expect(result.status).toBe("SUCCESS");
    });
  });
});
