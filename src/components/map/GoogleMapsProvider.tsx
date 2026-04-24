import React from "react";
import { useJsApiLoader } from "@react-google-maps/api";
import { env } from "config/env";

const libraries: ("places" | "geometry")[] = ["places", "geometry"];

interface GoogleMapsProviderProps {
  children: React.ReactNode;
}

export const GoogleMapsContext = React.createContext<{ isLoaded: boolean }>({
  isLoaded: false,
});

const GoogleMapsProvider: React.FC<GoogleMapsProviderProps> = ({ children }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: env.GOOGLE_MAPS_API_KEY,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => React.useContext(GoogleMapsContext);

export default GoogleMapsProvider;
