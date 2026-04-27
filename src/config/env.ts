type RuntimeConfig = {
  REACT_APP_REST_HOST?: string;
  REACT_APP_MEDIA_HOST?: string;
  REACT_APP_GOOGLE_MAPS_API_KEY?: string;
};

const runtimeConfig: RuntimeConfig =
  typeof window !== "undefined" ? window.__RUNTIME_CONFIG__ ?? {} : {};

const getNonEmpty = (value?: string): string | undefined => {
  if (typeof value !== "string") {
    return undefined;
  }

  return value.trim() === "" ? undefined : value;
};

const readEnv = (key: keyof RuntimeConfig): string => {
  return getNonEmpty(runtimeConfig[key]) ?? getNonEmpty(process.env[key]) ?? "";
};

export const env = {
  REST_HOST: readEnv("REACT_APP_REST_HOST"),
  MEDIA_HOST: readEnv("REACT_APP_MEDIA_HOST"),
  GOOGLE_MAPS_API_KEY: readEnv("REACT_APP_GOOGLE_MAPS_API_KEY"),
};
