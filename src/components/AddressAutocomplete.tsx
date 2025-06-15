// components/AddressAutocomplete.tsx
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import googleMapsLoader from '../utils/googleMapsLoader';

interface AddressAutocompleteProps {
  value: string;
  onChange: (address: string) => void;
  onSelect: (address: string, lat: number, lng: number) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  value,
  onChange,
  onSelect,
  placeholder,
  className = ""
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const defaultPlaceholder = placeholder || t('location.address.placeholder');

  useEffect(() => {
    const initializeAutocomplete = async () => {
      try {
        await googleMapsLoader.load();

        if (inputRef.current) {
          const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            types: ['address'],
            componentRestrictions: { country: 'pr' },
            fields: ['formatted_address', 'geometry.location', 'address_components'],
          });

          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace();
            if (place.formatted_address && place.geometry?.location) {
              const lat = place.geometry.location.lat();
              const lng = place.geometry.location.lng();
              onSelect(place.formatted_address, lat, lng);
            }
          });

          autocompleteRef.current = autocomplete;
        }

        setIsLoaded(true);
        setIsLoading(false);
        setError(null);
      } catch (error: any) {
        console.error('Error loading Google Maps:', error);
        setError('Failed to load Google Maps. Using fallback mode.');
        setIsLoaded(true);
        setIsLoading(false);
      }
    };

    initializeAutocomplete();

    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [onSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((!autocompleteRef.current || error) && e.key === 'Enter' && value) {
      e.preventDefault();
      const lat = 18.4655 + (Math.random() - 0.5) * 0.1;
      const lng = -66.1057 + (Math.random() - 0.5) * 0.1;
      onSelect(value, lat, lng);
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <MapPin className="h-5 w-5 text-gray-400" />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={defaultPlaceholder}
        className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${className}`}
      />
      {isLoading && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
        </div>
      )}
      <div className="text-xs text-gray-500 mt-1">
        {error ? (
          <span className="text-amber-600">{error} Presiona Enter para establecer coordenadas.</span>
        ) : isLoaded && autocompleteRef.current ? (
          'Comienza a escribir para buscar direcciones en Puerto Rico'
        ) : (
          'Presiona Enter para establecer coordenadas (modo demo)'
        )}
      </div>
    </div>
  );
};

export default AddressAutocomplete;

