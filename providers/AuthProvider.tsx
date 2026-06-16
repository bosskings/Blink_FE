import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const AUTH_TOKEN_KEY = "blink_token";
export const AUTH_PROFILE_KEY = "blink_profile";
export const ONBOARDING_KEY = "blink_onboarding";

type AuthProfile = Record<string, unknown> | null;

type AuthContextValue = {
  token: string | null;
  profile: AuthProfile;
  isLoading: boolean;
  login: (token: string, profile?: AuthProfile) => Promise<void>;
  logout: () => Promise<void>;
};

type SecureStoreModule = {
  getItemAsync: (key: string) => Promise<string | null>;
  setItemAsync: (key: string, value: string) => Promise<void>;
  deleteItemAsync: (key: string) => Promise<void>;
};

declare const require: (moduleName: string) => unknown;

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

let secureStoreModule: SecureStoreModule | null | undefined;

const getSecureStore = () => {
  if (secureStoreModule !== undefined) {
    return secureStoreModule;
  }

  try {
    secureStoreModule = require("expo-secure-store") as SecureStoreModule;
  } catch {
    secureStoreModule = null;
  }

  return secureStoreModule;
};

const authStorage = {
  async getItem(key: string) {
    const secureStore = getSecureStore();
    return secureStore
      ? secureStore.getItemAsync(key)
      : AsyncStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    const secureStore = getSecureStore();
    return secureStore
      ? secureStore.setItemAsync(key, value)
      : AsyncStorage.setItem(key, value);
  },
  async deleteItem(key: string) {
    const secureStore = getSecureStore();
    return secureStore
      ? secureStore.deleteItemAsync(key)
      : AsyncStorage.removeItem(key);
  },
};

const isValidToken = (token: string | null) =>
  typeof token === "string" && token.trim().length > 0;

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<AuthProfile>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadSession = async () => {
      try {
        const storedToken = await authStorage.getItem(AUTH_TOKEN_KEY);
        const storedProfile = await authStorage.getItem(AUTH_PROFILE_KEY);

        if (!mounted) {
          return;
        }

        if (isValidToken(storedToken)) {
          setToken(storedToken);
          setProfile(storedProfile ? JSON.parse(storedProfile) : null);
        } else {
          setToken(null);
          setProfile(null);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      mounted = false;
    };
  }, []);

  const login = useCallback(
    async (nextToken: string, nextProfile: AuthProfile = null) => {
      if (!isValidToken(nextToken)) {
        throw new Error("A valid auth token is required.");
      }

      await authStorage.setItem(AUTH_TOKEN_KEY, nextToken);

      if (nextProfile) {
        await authStorage.setItem(
          AUTH_PROFILE_KEY,
          JSON.stringify(nextProfile),
        );
      } else {
        await authStorage.deleteItem(AUTH_PROFILE_KEY);
      }

      setToken(nextToken);
      setProfile(nextProfile);
    },
    [],
  );

  const logout = useCallback(async () => {
    await Promise.all([
      authStorage.deleteItem(AUTH_TOKEN_KEY),
      authStorage.deleteItem(AUTH_PROFILE_KEY),
      authStorage.deleteItem(ONBOARDING_KEY),
    ]);

    setToken(null);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      token,
      profile,
      isLoading,
      login,
      logout,
    }),
    [isLoading, login, logout, profile, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
