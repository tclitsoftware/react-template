import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import moment from "moment";

import {
  DEFAULT_LANGUAGE,
  DEFAULT_NAMESPACE,
  FALLBACK_LANGUAGE,
  LANGUAGE_STORAGE_KEY,
} from "./constants";
import { AppLanguage, resources } from "./resources";

const getInitialLanguage = (): AppLanguage => {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE;
  }

  const storedLanguage = window.localStorage.getItem(
    LANGUAGE_STORAGE_KEY,
  ) as AppLanguage | null;

  if (storedLanguage && storedLanguage in resources) {
    return storedLanguage;
  }

  return DEFAULT_LANGUAGE;
};

void i18n.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  fallbackLng: FALLBACK_LANGUAGE,
  defaultNS: DEFAULT_NAMESPACE,
  ns: Object.keys(resources.en),
  interpolation: {
    escapeValue: false,
  },
});

void i18n.on("languageChanged", (language) => {
  const nextLanguage = language as AppLanguage;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
  }

  moment.locale(nextLanguage === "id" ? "id" : "en");
});

export default i18n;
