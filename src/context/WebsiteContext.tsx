"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface WebsiteSettings {
  brand: {
    name: string;
    slogan: string;
    description: string;
    logo?: string;
    favicon?: string;
  };
  contact: {
    phone: string;
    email: string;
    zalo: string;
    facebook: string;
    address: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    analyticsId?: string;
  };
  shipping: {
    fee: number;
    freeshipThreshold: number;
    estimatedTime: string;
  };
  payment: {
    cod: boolean;
    bankTransfer: {
      enabled: boolean;
      bankName: string;
      accountNumber: string;
      accountName: string;
      branch: string;
    };
  };
}

const defaultSettings: WebsiteSettings = {
  brand: {
    name: "Tranh Thêu Tay Hằng Khoa",
    slogan: "Kế thừa tinh hoa nghề thêu truyền thống",
    description: "Website bán tranh thêu tay và các sản phẩm thêu truyền thống.",
  },
  contact: {
    phone: "0982581222",
    email: "contact@hangkhoa.com",
    zalo: "0982581222",
    facebook: "https://facebook.com/tranhhangkhoa",
    address: "Xóm Hằng Khoa, Cũ Văn, Phú Lương, Thái Nguyên",
  },
  seo: {
    title: "Tranh Thêu Tay Hằng Khoa - Nghệ thuật thêu truyền thống",
    description: "Kế thừa tinh hoa nghề thêu truyền thống, mang đến những tác phẩm nghệ thuật độc đáo.",
    keywords: "tranh thêu tay, tranh thêu truyền thống, nghệ thuật việt",
  },
  shipping: {
    fee: 30000,
    freeshipThreshold: 500000,
    estimatedTime: "2-5 ngày",
  },
  payment: {
    cod: true,
    bankTransfer: {
      enabled: true,
      bankName: "Vietcombank",
      accountNumber: "1234567890",
      accountName: "NGUYEN VAN A",
      branch: "Hà Nội",
    },
  },
};

const STORAGE_KEY = "hangkhoa_website_settings";

interface WebsiteContextType {
  settings: WebsiteSettings;
  updateSettings: (newSettings: WebsiteSettings) => void;
}

const WebsiteContext = createContext<WebsiteContextType | undefined>(undefined);

export function WebsiteProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<WebsiteSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing website settings", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const updateSettings = (newSettings: WebsiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
  };

  useEffect(() => {
    if (isLoaded) {
      document.title = settings.seo.title;
      
      // Update meta description
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', settings.seo.description);

      // Update keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', settings.seo.keywords);

      // Update favicon if exists
      if (settings.brand.favicon) {
        let linkFavicon = document.querySelector('link[rel="icon"]');
        if (!linkFavicon) {
          linkFavicon = document.createElement('link');
          linkFavicon.setAttribute('rel', 'icon');
          document.head.appendChild(linkFavicon);
        }
        linkFavicon.setAttribute('href', settings.brand.favicon);
      }
    }
  }, [settings.seo, settings.brand.favicon, isLoaded]);

  return (
    <WebsiteContext.Provider value={{ settings, updateSettings }}>
      {children}
    </WebsiteContext.Provider>
  );
}

export function useWebsite() {
  const context = useContext(WebsiteContext);
  if (context === undefined) {
    throw new Error("useWebsite must be used within a WebsiteProvider");
  }
  return context;
}
