// global.d.ts
declare module "*.css";
declare module "moment/locale/*";

declare module "@hookform/resolvers/yup";

interface Window {
  __RUNTIME_CONFIG__?: {
    REACT_APP_REST_HOST?: string;
    REACT_APP_MEDIA_HOST?: string;
    REACT_APP_GOOGLE_MAPS_API_KEY?: string;
  };
}
