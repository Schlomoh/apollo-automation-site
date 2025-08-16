import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { SupportedLocale, SUPPORTED_LOCALES } from "./useTranslation";

interface LanguageContextType {
  currentLocale: SupportedLocale;
  setLocale: (locale: SupportedLocale) => void;
  availableLocales: SupportedLocale[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // Initialize with browser locale or 'en' as fallback
  const [currentLocale, setCurrentLocale] = useState<SupportedLocale>(() => {
    // Check localStorage first
    const storedLocale =
      typeof window !== "undefined"
        ? localStorage.getItem("apollo-locale")
        : null;
    if (
      storedLocale &&
      (SUPPORTED_LOCALES as readonly string[]).indexOf(storedLocale) !== -1
    ) {
      return storedLocale as SupportedLocale;
    }

    // Fall back to browser locale
    const browserLocale =
      typeof navigator !== "undefined"
        ? (navigator.language.split("-")[0] as SupportedLocale)
        : "en";

    return (SUPPORTED_LOCALES as readonly string[]).indexOf(browserLocale) !==
      -1
      ? browserLocale
      : "en";
  });

  // Get available locales by checking what locale files exist
  const availableLocales: SupportedLocale[] = ["en", "es"]; // Based on the files we found

  const setLocale = (locale: SupportedLocale) => {
    setCurrentLocale(locale);
    // Persist to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem("apollo-locale", locale);
      // Dispatch custom event to notify useTranslation hooks
      window.dispatchEvent(new CustomEvent("localeChange"));
    }
  };

  // Effect to handle initial load
  useEffect(() => {
    // Optional: You could add analytics tracking here when locale changes
    console.log(`Language changed to: ${currentLocale}`);
  }, [currentLocale]);

  const value: LanguageContextType = {
    currentLocale,
    setLocale,
    availableLocales,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
