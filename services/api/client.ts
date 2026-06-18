import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ApiError, ApiErrorResponse } from "@/types/api";

const AUTH_TOKEN_KEY = "blink_token";

type SecureStoreModule = {
  getItemAsync: (key: string) => Promise<string | null>;
  setItemAsync: (key: string, value: string) => Promise<void>;
};

let secureStoreModule: SecureStoreModule | null | undefined;

const getSecureStore = (): SecureStoreModule | null => {
  if (secureStoreModule !== undefined) return secureStoreModule;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    secureStoreModule = require("expo-secure-store") as SecureStoreModule;
  } catch {
    secureStoreModule = null;
  }
  return secureStoreModule;
};

const getStoredToken = async (): Promise<string | null> => {
  const store = getSecureStore();
  return store
    ? store.getItemAsync(AUTH_TOKEN_KEY)
    : AsyncStorage.getItem(AUTH_TOKEN_KEY);
};

const setStoredToken = async (token: string): Promise<void> => {
  const store = getSecureStore();
  if (store) {
    await store.setItemAsync(AUTH_TOKEN_KEY, token);
  } else {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);
  }
};

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api/v1",
  timeout: 30_000,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getStoredToken();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error: unknown, token: string | null = null): void => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise<AxiosResponse>((resolve, reject) => {
          failedQueue.push({
            resolve: (newToken: string) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
              }
              resolve(apiClient(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axios.post<{ status: string; token: string }>(
          `${apiClient.defaults.baseURL}/auth/refresh-token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${await getStoredToken()}`,
            },
          },
        );

        const newToken = refreshResponse.data.token;
        await setStoredToken(newToken);
        processQueue(null, newToken);

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
        }
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        await AsyncStorage.multiRemove([AUTH_TOKEN_KEY, "blink_profile", "blink_onboarding"]);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (error.response?.data) {
      throw new ApiError(
        error.response.status,
        error.response.data,
      );
    }

    throw error;
  },
);

export { apiClient, getStoredToken, setStoredToken };
