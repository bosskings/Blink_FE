import AsyncStorage from "@react-native-async-storage/async-storage";

const PENDING_SIGNUP_SESSION_KEY = "blink_pending_signup_session";

type AuthFlow = "signup" | "login";
type SignupMethod = "phone" | "email";

interface BaseAuthProfile {
  [key: string]: unknown;
  userId: string;
  flow: AuthFlow;
  issuedAt: string;
}

interface SignupAuthProfile extends BaseAuthProfile {
  flow: "signup";
  method: SignupMethod;
  identifier: string;
  isBusiness: boolean;
}

interface LoginAuthProfile extends BaseAuthProfile {
  flow: "login";
  identifier: string;
}

export interface FakeAuthSession<TProfile = Record<string, unknown>> {
  token: string;
  profile: TProfile;
}

type PendingSignupSession = FakeAuthSession<SignupAuthProfile>;

const createToken = (prefix: AuthFlow): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${timestamp}_${random}`;
};

const createBaseProfile = (flow: AuthFlow): BaseAuthProfile => {
  const issuedAt = new Date().toISOString();
  return {
    userId: createToken("login"),
    flow,
    issuedAt,
  };
};

export const createSignupSession = (
  method: SignupMethod,
  identifier: string,
  isBusiness: boolean = false,
): PendingSignupSession => ({
  token: createToken("signup"),
  profile: {
    ...createBaseProfile("signup"),
    flow: "signup",
    method,
    identifier,
    isBusiness,
  },
});

export const createLoginSession = (
  identifier: string,
): FakeAuthSession<LoginAuthProfile> => ({
  token: createToken("login"),
  profile: {
    ...createBaseProfile("login"),
    flow: "login",
    identifier,
  },
});

export const storePendingSignupSession = async (
  session: PendingSignupSession,
): Promise<void> => {
  await AsyncStorage.setItem(
    PENDING_SIGNUP_SESSION_KEY,
    JSON.stringify(session),
  );
};

export const consumePendingSignupSession =
  async (): Promise<PendingSignupSession | null> => {
    const rawSession = await AsyncStorage.getItem(PENDING_SIGNUP_SESSION_KEY);

    if (!rawSession) {
      return null;
    }

    await AsyncStorage.removeItem(PENDING_SIGNUP_SESSION_KEY);

    try {
      const parsed = JSON.parse(rawSession) as PendingSignupSession;
      if (typeof parsed?.token !== "string" || !parsed.profile) {
        return null;
      }

      return parsed;
    } catch {
      return null;
    }
  };

export const clearPendingSignupSession = async (): Promise<void> => {
  await AsyncStorage.removeItem(PENDING_SIGNUP_SESSION_KEY);
};
