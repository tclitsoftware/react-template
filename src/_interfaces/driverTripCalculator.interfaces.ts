export interface Location {
  name: string;
  lat: number;
  lng: number;
}

export interface VehicleTypeOption {
  id: string;
  name: string;
  category: "truck" | "chassis";
  is_add_on: boolean;
}

export interface VehicleModelOption {
  id: string;
  name: string;
  vehicle_type_id: string;
  freezer_model_id?: string;
  freezer_model_name?: string;
}

export interface FreezerModelOption {
  id: string;
  name: string;
  fuel_efficiency: number; // liter/jam
}

export interface VehicleAttachmentOption {
  id: string;
  name: string;
  type: "chassis" | "auxiliary";
}

export interface TripTypeOption {
  id: string;
  name: string;
  value: string;
  is_freezer?: boolean;
}

export interface AdditionalCostType {
  value: string;
  label: string;
}

export interface TripSegmentAdditionalCost {
  id?: string;
  cost_type: string;
  amount: number;
  created_at?: string;
}

// A single waypoint in a trip segment location list
export interface LocationPoint {
  name: string;
  lat: number;
  lng: number;
  avoid_toll: boolean;
}

// Route info between two adjacent waypoints
export interface LocationPairRoute {
  distance_km: number;
  estimated_time_minutes: number;
  route_polyline?: string;
}

export interface TripSegmentLocation {
  id?: string;
  start_location_name: string;
  start_location_lat: number;
  start_location_lng: number;
  end_location_name: string;
  end_location_lat: number;
  end_location_lng: number;
  avoid_toll: boolean;
  distance_km: number;
  estimated_time_minutes: number;
  route_polyline?: string;
}

export interface TripSegment {
  id?: string;
  segment_order: number;
  trip_type_id: string;
  trip_type?: TripTypeOption;
  locations: TripSegmentLocation[];
  distance_km: number;
  estimated_time_minutes: number; // GPS time from Google Maps
  recommended_time_minutes: number; // distance_km / avg_speed
  fuel_usage: number; // km/liter from vehicle_operation
  fuel_price: number; // Rp/liter from fuel_type
  avg_speed: number; // km/jam from vehicle_operation
  working_hours: number; // jam/hari from vehicle_operation
  trip_days: number; // ceil((recommended_time + rest) / working_hours)
  total_basic_rate: number; // trip_days × driver_basic_rate
  incentive_rate: number; // distance_km × driver_insentif_rate
  solar_perjalanan: number; // (distance_km / fuel_usage) × fuel_price
  total_freezer_fuel: number; // (idle + rest) × fuel_efficiency × fuel_price
  freezer_fuel_efficiency: number; // liter/jam from freezer_model
  expected_fuel_cost: number; // same as solar_perjalanan (display alias)
  driver_basic_rate: number; // Rp/hari from driver_allowance config
  driver_insentif_rate: number; // Rp/km from driver_allowance config
  driver_allowance: number; // uang jalan all in = basic + incentive + solar + freezer
  rest_time: number;
  idle_time: number;
  segment_total: number; // driver_allowance + additional_costs
  additional_costs: TripSegmentAdditionalCost[];
  freezer_idle_hours?: number | null;
  created_at?: string;
}

export interface TripCalculation {
  id: string;
  customer: string;
  temperature: number;
  plate_number: string;
  vehicle_type: {
    id: string;
    name: string;
  };
  vehicle_model: {
    id: string;
    name: string;
  };
  segments: TripSegment[];
  grand_total: number;
  status: "draft" | "completed";
  created_at: string;
  created_by?: string;
}

// Form data structures — a single location point in the form
export interface LocationFormData {
  name: string;
  lat: number;
  lng: number;
  avoid_toll: boolean;
}

export interface SegmentFormData {
  segment_order: number;
  trip_type_id: string;
  locations: LocationFormData[];
  rest_time: number;
  freezer_idle_hours: number | null;
  enable_additional_cost: boolean;
  additional_costs: {
    cost_type: string;
    amount: number | string;
  }[];
}

export interface DriverTripCalculatorFormData {
  customer: string;
  temperature: number | string;
  plate_number: string;
  vehicle_type_id: string;
  vehicle_model_id: string;
  segments: SegmentFormData[];
}

// API Request/Response
export interface CalculateTripRequest {
  customer: string;
  temperature: number;
  plate_number: string;
  vehicle_type_id: string;
  vehicle_model_id: string;
  segments: {
    segment_order: number;
    trip_type_id: string;
    freezer_idle_hours: number | null;
    rest_time: number;
    distance_km: number; // from Google Maps Directions API
    estimated_time_minutes: number; // from Google Maps Directions API (GPS time)
    route_pairs: LocationPairRoute[]; // per-leg route data from Google Maps
    locations: {
      name: string;
      lat: number;
      lng: number;
      avoid_toll: boolean;
    }[];
    additional_costs: {
      cost_type: string;
      amount: number;
    }[];
  }[];
}

export interface CalculateTripResponse {
  data: TripCalculation;
}

// Segment colors for UI
export const SEGMENT_COLORS = [
  "#606c38",
  "#283618",
  "#780000",
  "#c1121f",
  "#dda15e",
  "#669bbc",
  "#0077b6",
  "#2a9d8f",
  "#e76f51",
  "#590d22",
  "#fca311",
] as const;

export type SegmentColor = typeof SEGMENT_COLORS[number];

// Default empty location
export const DEFAULT_LOCATION: LocationFormData = {
  name: "",
  lat: 0,
  lng: 0,
  avoid_toll: false,
};
