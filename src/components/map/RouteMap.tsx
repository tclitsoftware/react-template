import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoogleMap, Polyline, Marker } from "@react-google-maps/api";
import { useGoogleMaps } from "./GoogleMapsProvider";
import { SEGMENT_COLORS } from "_interfaces/driverTripCalculator.interfaces";
import Icon from "components/icon";

interface RouteSegment {
  locations: { name: string; lat: number; lng: number; avoid_toll?: boolean }[];
  segmentIndex: number;
}

interface RouteMapProps {
  segments: RouteSegment[];
  className?: string;
}

// One leg = one pair of adjacent locations within a segment
interface LegRoute {
  path: google.maps.LatLng[];
  color: string;
}

// One entry per segment — holds all its legs and location pin data
interface SegmentRoute {
  legs: LegRoute[];
  locations: { lat: number; lng: number; name: string }[];
  pinColors: string[]; // one color per location pin (matches the leg starting from it)
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
  minHeight: "600px",
  borderRadius: "12px",
};

const defaultCenter = { lat: -7.2575, lng: 112.7521 }; // Surabaya

// Shuffle SEGMENT_COLORS once on module load — random but stable per browser session
const shuffledColors = (() => {
  const colors = [...SEGMENT_COLORS] as string[];
  for (let i = colors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [colors[i], colors[j]] = [colors[j], colors[i]];
  }
  return colors;
})();

const createPinIcon = (number: number, color: string) => ({
  path: google.maps.SymbolPath.CIRCLE,
  fillColor: color,
  fillOpacity: 1,
  strokeColor: "#ffffff",
  strokeWeight: 2,
  scale: 14,
  labelOrigin: new google.maps.Point(0, 0),
});

const pinLabel = (number: number): google.maps.MarkerLabel => ({
  text: String(number),
  color: "#ffffff",
  fontWeight: "bold",
  fontSize: "11px",
});

// Build a string key from the actual location values to detect real changes
const buildLocationsKey = (segments: RouteSegment[]) =>
  segments
    .map((s) =>
      s.locations
        .map((l) => `${l.lat.toFixed(6)},${l.lng.toFixed(6)},${l.avoid_toll ? 1 : 0}`)
        .join("|"),
    )
    .join(";");

const RouteMap: React.FC<RouteMapProps> = ({ segments, className = "" }) => {
  const { isLoaded } = useGoogleMaps();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [segmentRoutes, setSegmentRoutes] = useState<SegmentRoute[]>([]);

  // Track the last computed key so we skip runs where nothing actually changed
  const prevKeyRef = useRef("");
  // Track the current run ID to cancel stale async computations
  const runIdRef = useRef(0);

  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const currentKey = buildLocationsKey(segments);
    if (currentKey === prevKeyRef.current) return; // nothing changed
    prevKeyRef.current = currentKey;

    const myRunId = ++runIdRef.current;

    const processSegments = async () => {
      let RouteClass: any;
      try {
        const lib = await google.maps.importLibrary("routes");
        RouteClass = (lib as any).Route;
      } catch {
        console.error("Failed to load routes library for map");
        return;
      }

      const results: SegmentRoute[] = [];
      let globalLegIndex = 0;

      for (const segment of segments) {
        if (myRunId !== runIdRef.current) return; // stale, abort

        const validLocs = segment.locations.filter(
          (loc) => loc.lat !== 0 && loc.lng !== 0 && loc.name !== "",
        );

        if (validLocs.length < 2) continue;

        const legs: LegRoute[] = [];
        const legColors: string[] = [];

        for (let i = 0; i < validLocs.length - 1; i++) {
          if (myRunId !== runIdRef.current) return; // stale, abort

          const from = validLocs[i];
          const to = validLocs[i + 1];
          const color = shuffledColors[globalLegIndex % shuffledColors.length];

          try {
            const response = await RouteClass.computeRoutes({
              origin: { location: new google.maps.LatLng(from.lat, from.lng) },
              destination: { location: new google.maps.LatLng(to.lat, to.lng) },
              travelMode: "DRIVING",
              routeModifiers: { avoidTolls: to.avoid_toll === true },
              fields: ["path"],
            });

            const route = response?.routes?.[0];
            if (!route?.path || route.path.length === 0) continue;

            legs.push({ path: route.path, color });
            legColors.push(color);
            globalLegIndex++;
          } catch (error) {
            console.error(
              `Failed to compute leg ${i + 1} for segment ${segment.segmentIndex + 1}:`,
              error,
            );
          }
        }

        if (legs.length > 0) {
          // Pin[i] uses the color of the leg starting from location[i].
          // The last location has no outgoing leg, so it reuses the last leg color.
          const pinColors = validLocs.map((_, i) =>
            i < legColors.length ? legColors[i] : legColors[legColors.length - 1],
          );

          results.push({
            legs,
            locations: validLocs.map((loc) => ({
              lat: loc.lat,
              lng: loc.lng,
              name: loc.name,
            })),
            pinColors,
          });
        }
      }

      if (myRunId !== runIdRef.current) return; // stale, abort
      setSegmentRoutes(results);
    };

    processSegments();
  }, [isLoaded, segments]);

  // Fit bounds when routes change
  useEffect(() => {
    if (!mapRef.current || segmentRoutes.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    segmentRoutes.forEach(({ legs }) => {
      legs.forEach(({ path }) => {
        path.forEach((point) => bounds.extend(point));
      });
    });
    mapRef.current.fitBounds(bounds, 50);
  }, [segmentRoutes]);

  if (!isLoaded) {
    return (
      <div
        className={`flex min-h-[600px] w-full items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 ${className}`}
        data-testid="map-dtc-route-display"
      >
        <div className="text-center">
          <Icon name="map" className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`overflow-hidden rounded-xl ${className}`} data-testid="map-dtc-route-display">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={defaultCenter}
        zoom={10}
        onLoad={onMapLoad}
        options={{
          zoomControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
        }}
      >
        {segmentRoutes.map((sr, srIdx) => (
          <React.Fragment key={srIdx}>
            {/* One polyline per leg, each with its own color */}
            {sr.legs.map((leg, legIdx) => (
              <Polyline
                key={`leg-${srIdx}-${legIdx}`}
                path={leg.path}
                options={{
                  strokeColor: leg.color,
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                }}
              />
            ))}
            {/* Numbered pin at every waypoint */}
            {sr.locations.map((loc, locIdx) => (
              <Marker
                key={`pin-${srIdx}-${locIdx}`}
                position={{ lat: loc.lat, lng: loc.lng }}
                icon={createPinIcon(locIdx + 1, sr.pinColors[locIdx])}
                label={pinLabel(locIdx + 1)}
                title={loc.name}
              />
            ))}
          </React.Fragment>
        ))}

        {/* Pin for segments that have only one valid location (not yet routable) */}
        {segments
          .filter((seg) => {
            const valid = seg.locations.filter((loc) => loc.lat !== 0 && loc.lng !== 0);
            return valid.length === 1;
          })
          .flatMap((seg) => {
            const color = shuffledColors[seg.segmentIndex % shuffledColors.length];
            return seg.locations
              .filter((loc) => loc.lat !== 0 && loc.lng !== 0)
              .map((loc, i) => (
                <Marker
                  key={`pin-single-${seg.segmentIndex}-${i}`}
                  position={{ lat: loc.lat, lng: loc.lng }}
                  icon={createPinIcon(1, color)}
                  label={pinLabel(1)}
                  title={loc.name}
                />
              ));
          })}
      </GoogleMap>
    </div>
  );
};

export default RouteMap;
