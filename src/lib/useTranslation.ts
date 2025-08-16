import { useMemo, useCallback, useContext, useState, useEffect } from "react";

// Supported locales
export const SUPPORTED_LOCALES = ["en", "es", "fr", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

// Helper function to check if a locale is supported
const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return (SUPPORTED_LOCALES as readonly string[]).indexOf(locale) !== -1;
};

// Translation interface
export interface TranslationData {
  [key: string]: string;
}

// Cache for loaded translations to avoid re-importing
const translationCache = new Map<string, TranslationData>();

/**
 * Custom hook for internationalization
 * Provides translation functionality with fallback support
 *
 * @param localeOverride - Optional locale override, defaults to browser locale
 * @returns Translation function that accepts a key and returns the translated string
 * 
 * # Translation System Documentation

## Overview

The refactored `useTranslation` hook provides a robust, production-ready internationalization (i18n) solution for the Apollo Automation website. It includes proper TypeScript support, caching, fallbacks, and error handling.

## Features

- ✅ **Type Safety**: Full TypeScript support with defined locale types
- ✅ **Caching**: Translation files are cached to avoid repeated imports
- ✅ **Fallback Support**: Graceful fallback to English when translations are missing
- ✅ **Nested Keys**: Support for dot notation (e.g., `common.button.save`)
- ✅ **Browser Locale Detection**: Automatic detection of user's preferred language
- ✅ **Development Warnings**: Missing translation warnings in development mode
- ✅ **Performance Optimized**: Uses React hooks with proper memoization

## Usage

### Basic Usage

```tsx
import { useTranslation } from "@/lib/useTranslation";

function MyComponent() {
  const { t, locale } = useTranslation();

  return (
    <div>
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
      <button>{t("common.button.save")}</button>
    </div>
  );
}
```

### With Locale Override

```tsx
import { useTranslation } from "@/lib/useTranslation";

function MyComponent() {
  const { t, locale } = useTranslation("es"); // Force Spanish

  return (
    <div>
      <h1>{t("hero.title")}</h1> 
      <p>Current locale: {locale}</p> 
    </div>
  );
}
```

### With Fallback Text

```tsx
import { useTranslation } from "@/lib/useTranslation";

function MyComponent() {
  const { t } = useTranslation();

  return (
    <div>

      <h1>{t("missing.key", "Default Title")}</h1>
    </div>
  );
}
```

## File Structure

```
src/
├── locales/
│   ├── en.json    # English translations (default)
│   ├── es.json    # Spanish translations
│   ├── fr.json    # French translations
│   └── de.json    # German translations
└── lib/
    └── useTranslation.ts
```

## Translation File Format

Translation files should follow this nested JSON structure:

```json
{
  "common": {
    "button": {
      "save": "Save",
      "cancel": "Cancel"
    },
    "navigation": {
      "home": "Home",
      "about": "About"
    }
  },
  "pages": {
    "hero": {
      "title": "Welcome",
      "subtitle": "Get started today"
    }
  }
}
```

## API Reference

### useTranslation(localeOverride?)

**Parameters:**

- `localeOverride` (optional): Force a specific locale instead of auto-detection

**Returns:**

- `t(key, fallback?)`: Translation function
- `locale`: Current active locale
- `isLoading`: Loading state (currently always false)
- `supportedLocales`: Array of supported locales

### Translation Function: t(key, fallback?)

**Parameters:**

- `key`: Translation key with dot notation support (e.g., 'common.button.save')
- `fallback` (optional): Text to show if translation is missing

**Returns:**

- Translated string or fallback text

## Supported Locales

- `en` - English (default)
- `es` - Spanish
- `fr` - French
- `de` - German

To add more locales:

1. Add the locale code to `SUPPORTED_LOCALES` in `useTranslation.ts`
2. Create the corresponding JSON file in `src/locales/`

## Best Practices

1. **Use descriptive keys**: `hero.title` instead of `title1`
2. **Group related translations**: Use nested objects for organization
3. **Provide fallbacks**: Always include fallback text for user-facing content
4. **Keep English complete**: English should have all keys as it's the fallback locale
5. **Use TypeScript**: Leverage the type safety for locale parameters

## Error Handling

- Missing translation files fall back to English
- Missing keys return the key itself or provided fallback
- Development warnings help identify missing translations
- Production builds suppress warning logs for performance

## Performance Notes

- Translations are cached after first load
- Uses React's `useMemo` and `useCallback` for optimization
- Eager loading prevents runtime delays
- No unnecessary re-renders when locale doesn't change

 */
export const useTranslation = (localeOverride?: SupportedLocale) => {
  // State to trigger re-renders when locale changes
  const [, forceUpdate] = useState({});

  // Listen for locale changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      forceUpdate({});
    };

    // Listen for storage events (when changed in other tabs/windows)
    window.addEventListener("storage", handleStorageChange);

    // Listen for custom event when changed in same tab
    window.addEventListener("localeChange", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localeChange", handleStorageChange);
    };
  }, []);

  // Determine the locale with fallback chain
  const locale = useMemo((): SupportedLocale => {
    if (localeOverride && isSupportedLocale(localeOverride)) {
      return localeOverride;
    }

    // Try to get locale from localStorage (set by LanguageProvider)
    try {
      const contextLocale =
        typeof window !== "undefined"
          ? localStorage.getItem("apollo-locale")
          : null;

      if (contextLocale && isSupportedLocale(contextLocale)) {
        return contextLocale;
      }
    } catch (error) {
      // LocalStorage not available, continue with browser detection
    }

    // Extract browser locale and find best match
    const browserLocale =
      typeof navigator !== "undefined"
        ? (navigator.language.split("-")[0] as SupportedLocale)
        : "en";

    return isSupportedLocale(browserLocale) ? browserLocale : "en";
  }, [localeOverride, forceUpdate]); // Add forceUpdate as dependency

  // Load translations with caching
  const translations = useMemo((): TranslationData => {
    // Check cache first
    if (translationCache.has(locale)) {
      return translationCache.get(locale)!;
    }

    try {
      // Import all locale files using glob pattern
      const localeFiles = import.meta.glob<{ default: TranslationData }>(
        "/src/locales/*.json",
        { eager: true }
      );

      // Find the matching locale file
      const localeFilePath = `/src/locales/${locale}.json`;
      const translationModule = localeFiles[localeFilePath];

      if (translationModule?.default) {
        const translationData = translationModule.default;
        translationCache.set(locale, translationData);
        return translationData;
      }

      // Fallback to English if locale file not found
      const fallbackPath = "/src/locales/en.json";
      const fallbackModule = localeFiles[fallbackPath];

      if (fallbackModule?.default) {
        const fallbackData = fallbackModule.default;
        translationCache.set(locale, fallbackData);
        console.warn(
          `Translation file for locale "${locale}" not found, falling back to English`
        );
        return fallbackData;
      }

      // If no translations found, return empty object
      console.error(
        `No translation files found. Expected files in /src/locales/`
      );
      return {};
    } catch (error) {
      console.error("Error loading translations:", error);
      return {};
    }
  }, [locale]);

  // Translation function with memoization
  const t = useCallback(
    (key: string, fallback?: string): string => {
      if (!key) {
        console.warn("Translation key is empty or undefined");
        return fallback || key || "";
      }

      // Support nested keys with dot notation (e.g., "common.button.save")
      const translation = key.split(".").reduce((obj: any, k: string) => {
        return obj?.[k];
      }, translations);

      if (translation && typeof translation === "string") {
        return translation;
      }

      // Log missing translations in development
      if (import.meta.env?.DEV) {
        console.warn(
          `Missing translation for key: "${key}" in locale: "${locale}"`
        );
      }

      // Return fallback, key, or empty string
      return fallback || key || "";
    },
    [translations, locale]
  );

  return {
    t,
    locale,
    isLoading: false, // Could be enhanced to support async loading
    supportedLocales: SUPPORTED_LOCALES,
  };
};
