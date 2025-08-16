import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "../lib/useTranslation";
import { useLanguage } from "../lib/LanguageContext";
import { SupportedLocale } from "../lib/useTranslation";

export const LanguageSelector: React.FC = () => {
  const { currentLocale, setLocale, availableLocales } = useLanguage();
  const { t } = useTranslation(currentLocale); // Use current locale from context
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (locale: SupportedLocale) => {
    setLocale(locale);
    setIsOpen(false);
  };

  const getCurrentLanguageName = () => {
    return t(`common.languages.${currentLocale}`);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-gray-400 hover:text-orange-500 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-gray-900"
          id="language-menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={t("footer.languageSelector.selectLanguage")}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Globe icon */}
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
          {getCurrentLanguageName()}
          {/* Chevron icon */}
          <svg
            className={`ml-2 h-4 w-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="language-menu-button"
          >
            {availableLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLocaleChange(locale)}
                className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                  currentLocale === locale
                    ? "bg-orange-50 text-orange-600 font-medium"
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`}
                role="menuitem"
                aria-label={`${t(
                  "footer.languageSelector.selectLanguage"
                )}: ${t(`common.languages.${locale}`)}`}
              >
                <div className="flex items-center">
                  {t(`common.languages.${locale}`)}
                  {currentLocale === locale && (
                    <svg
                      className="ml-auto h-4 w-4 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
