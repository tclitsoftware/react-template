import React, { useRef, useEffect, useState, useCallback } from "react";
import { useGoogleMaps } from "./GoogleMapsProvider";

interface PlacesAutocompleteInputProps {
  value: string;
  onChange: (location: { name: string; lat: number; lng: number }) => void;
  placeholder?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  "data-testid"?: string;
}

interface Suggestion {
  placeId: string;
  text: string;
  placePrediction: google.maps.places.PlacePrediction;
}

const PlacesAutocompleteInput: React.FC<PlacesAutocompleteInputProps> = ({
  value,
  onChange,
  placeholder = "Search location...",
  disabled = false,
  icon,
  "data-testid": testId,
}) => {
  const { isLoaded } = useGoogleMaps();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [ready, setReady] = useState(false);

  // Check if Places library is available
  useEffect(() => {
    if (!isLoaded || !window.google) return;

    const init = async () => {
      try {
        await google.maps.importLibrary("places");
        setReady(true);
      } catch (e) {
        console.error("Failed to load places library:", e);
      }
    };
    init();
  }, [isLoaded]);

  // Sync external value to internal input
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchSuggestions = useCallback(
    async (input: string) => {
      if (!ready || !input.trim()) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      try {
        const { suggestions: results } =
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input,
            includedRegionCodes: ["id"],
          });

        const mapped: Suggestion[] = results
          .filter((s) => s.placePrediction)
          .map((s) => ({
            placeId: s.placePrediction!.placeId,
            text: s.placePrediction!.text.toString(),
            placePrediction: s.placePrediction!,
          }));

        setSuggestions(mapped);
        setIsOpen(mapped.length > 0);
      } catch (error) {
        console.error("AutocompleteSuggestion error:", error);
        setSuggestions([]);
        setIsOpen(false);
      }
    },
    [ready],
  );

  const handleSelect = async (suggestion: Suggestion) => {
    const name = suggestion.text;
    setInputValue(name);
    setSuggestions([]);
    setIsOpen(false);

    try {
      const place = suggestion.placePrediction.toPlace();
      await place.fetchFields({ fields: ["location"] });

      const location = place.location;
      if (location) {
        onChange({ name, lat: location.lat(), lng: location.lng() });
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(val);
    }, 300);
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-gray-50 px-3 py-2.5">
        {icon}
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          disabled
          className="w-full bg-transparent text-sm text-gray-500 outline-none"
          data-testid={testId}
        />
      </div>
    );
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-3 py-2.5 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500">
        {icon}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled || !ready}
          className="w-full bg-transparent text-sm text-text-primary outline-none placeholder:text-gray-400"
          data-testid={testId}
        />
      </div>

      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.placeId}
              onClick={() => handleSelect(suggestion)}
              className="cursor-pointer px-3 py-2.5 text-sm text-text-primary hover:bg-primary-50 transition-colors"
            >
              {suggestion.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocompleteInput;
