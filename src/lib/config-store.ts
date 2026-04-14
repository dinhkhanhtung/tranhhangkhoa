"use client";

// Define the API Settings interface
export interface APISettings {
  imgbb: {
    apiKey: string;
    apiUrl: string;
  };
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
  };
  facebook: {
    appId: string;
    appSecret: string;
    pageId: string;
    accessToken: string;
  };
}

const STORAGE_KEY = "hangkhoa_api_config";

// Default/Empty Settings
const defaultSettings: APISettings = {
  imgbb: {
    apiKey: "",
    apiUrl: "https://api.imgbb.com/1/upload",
  },
  firebase: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
  },
  facebook: {
    appId: "",
    appSecret: "",
    pageId: "",
    accessToken: "",
  },
};

/**
 * Hook or Utility to manage API settings
 * Since we want this to be "clonable", we store it in LocalStorage first.
 * For production, we can sync this to a Master DB or use .env as a fallback.
 */
export const configStore = {
  getSettings: (): APISettings => {
    if (typeof window === "undefined") return defaultSettings;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      // Check for environment variables as fallback
      const envSettings = {
        ...defaultSettings,
        firebase: {
          apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
          authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
          storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
          messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
          appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
        },
        imgbb: {
          apiKey: process.env.NEXT_PUBLIC_IMGBB_API_KEY || "",
          apiUrl: process.env.NEXT_PUBLIC_IMGBB_API_URL || "https://api.imgbb.com/1/upload",
        }
      };
      return envSettings;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultSettings;
    }
  },

  saveSettings: (settings: APISettings) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    // Trigger a page reload or a custom event to re-initialize services
    window.location.reload();
  },

  clearSettings: () => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  }
};
