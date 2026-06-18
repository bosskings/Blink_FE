import { initializePayment, verifyPayment, fetchBanks, verifyAccount, confirmPickup } from "@/services/api/payments";
import { apiClient } from "@/services/api/client";
import type { InitializePaymentResponse, VerifyPaymentResponse, BanksResponse, VerifyAccountResponse, ConfirmPickupResponse } from "@/types/payment";

jest.mock("@/services/api/client", () => ({ apiClient: { get: jest.fn(), post: jest.fn() }, getStoredToken: jest.fn(), setStoredToken: jest.fn() }));
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("Payments API Service", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  it("initializePayment calls POST /payments/initialize", async () => {
    const mock: InitializePaymentResponse = { status: "SUCCESS", authorization_url: "https://pay.example.com", reference: "ref123" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await initializePayment({ listingId: "listing1" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/payments/initialize", { listingId: "listing1" });
    expect(result.reference).toBe("ref123");
  });

  it("verifyPayment calls POST /payments/verify", async () => {
    const mock: VerifyPaymentResponse = { status: "SUCCESS", message: "Verified" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await verifyPayment({ reference: "ref123" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/payments/verify", { reference: "ref123" });
    expect(result.status).toBe("SUCCESS");
  });

  it("fetchBanks calls GET /payments/banks", async () => {
    const mock: BanksResponse = { status: "SUCCESS", banks: [{ name: "Access Bank", code: "044" }] };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await fetchBanks();
    expect(mockedApiClient.get).toHaveBeenCalledWith("/payments/banks");
    expect(result.banks).toHaveLength(1);
  });

  it("verifyAccount calls GET /payments/verify-account with query", async () => {
    const mock: VerifyAccountResponse = { status: "SUCCESS", accountName: "JOHN DOE" };
    mockedApiClient.get.mockResolvedValueOnce({ data: mock });
    const result = await verifyAccount({ accountNumber: "0001234567", bankCode: "044" });
    expect(mockedApiClient.get).toHaveBeenCalledWith(expect.stringContaining("/payments/verify-account?"));
    expect(result.accountName).toBe("JOHN DOE");
  });

  it("confirmPickup calls POST /payments/confirm-pickup", async () => {
    const mock: ConfirmPickupResponse = { status: "SUCCESS", message: "Confirmed" };
    mockedApiClient.post.mockResolvedValueOnce({ data: mock });
    const result = await confirmPickup({ transactionId: "tx1", pickupCode: "8472XKQB" });
    expect(mockedApiClient.post).toHaveBeenCalledWith("/payments/confirm-pickup", { transactionId: "tx1", pickupCode: "8472XKQB" });
    expect(result.status).toBe("SUCCESS");
  });
});
