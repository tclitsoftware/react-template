export const env = {
  REST_HOST:
    window.__RUNTIME_CONFIG__?.REACT_APP_REST_HOST ||
    process.env.REACT_APP_REST_HOST ||
    "",

  MEDIA_HOST:
    window.__RUNTIME_CONFIG__?.REACT_APP_MEDIA_HOST ||
    process.env.REACT_APP_MEDIA_HOST ||
    "",

  GOOGLE_MAPS_API_KEY:
    window.__RUNTIME_CONFIG__?.REACT_APP_GOOGLE_MAPS_API_KEY ||
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
    "",

  // keep REACT_APP aliases too, in case other files use these names
  REACT_APP_REST_HOST:
    window.__RUNTIME_CONFIG__?.REACT_APP_REST_HOST ||
    process.env.REACT_APP_REST_HOST ||
    "",

  REACT_APP_MEDIA_HOST:
    window.__RUNTIME_CONFIG__?.REACT_APP_MEDIA_HOST ||
    process.env.REACT_APP_MEDIA_HOST ||
    "",

  REACT_APP_GOOGLE_MAPS_API_KEY:
    window.__RUNTIME_CONFIG__?.REACT_APP_GOOGLE_MAPS_API_KEY ||
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY ||
    "",
};

export default env;