// Map Placeholder Component
// Temporary placeholder for Google Maps integration

import React from "react";
import Icon from "components/icon";

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder: React.FC<MapPlaceholderProps> = ({ className = "" }) => {
  return (
    <div
      className={`flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}
      data-testid="map-dtc-route-display"
    >
      <Icon name="map" className="h-16 w-16 text-gray-400" />
      <p className="mt-4 text-sm font-medium text-gray-500">
        Configure trip segments to view route
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Google Maps integration coming soon
      </p>
    </div>
  );
};

export default MapPlaceholder;
