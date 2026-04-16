"use client";

import { useEffect } from "react";
import { useWebsite } from "@/context/WebsiteContext";
import { getThemePreset, generateCSSVariables } from "@/lib/theme-presets";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { settings } = useWebsite();
  const { theme } = settings;

  useEffect(() => {
    // Get colors based on preset or custom settings
    let colors;
    if (theme.preset === "custom") {
      colors = {
        primary: theme.primaryColor,
        secondary: theme.secondaryColor,
        accent: theme.accentColor,
        dark: theme.darkColor,
        light: "#f5f5f4", // Default light color
      };
    } else {
      const preset = getThemePreset(theme.preset);
      colors = preset.colors;
    }

    // Apply CSS variables to document root
    const root = document.documentElement;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-dark", colors.dark);
    root.style.setProperty("--color-light", colors.light);

    // Also update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute("content", colors.primary);
    }
  }, [theme]);

  return <>{children}</>;
}

