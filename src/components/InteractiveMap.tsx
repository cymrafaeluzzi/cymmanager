// components/InteractiveMap.tsx
import React, { useEffect, useRef, useState } from 'react';
import { MapPin, Info, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import googleMapsLoader from '../utils/googleMapsLoader';

interface InteractiveMapProps {
  lat?: number;
  lng?: number;
  onLocationChange: (lat: number, lng: number) => void;
  address: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  lat = 18.4655,
  lng = -66.1057,
  onLocationChange,
  address
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const initializeMap = async () => {
      try {
        await googleMapsLoader.load();

        if (mapRef.current) {
          const map = new google.maps.Map(mapRef.current, {
            center: { lat, lng },
            zoom: 16,
            mapTypeControl: true,
            streetViewControl: true,
            fullscreenControl: true,
            zoomControl: true,
            styles: [{
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'on' }]
            }]
          });

          const marker = new google.maps.Marker({
            position: { lat, lng },
            map: map,
            draggable: true,
            title: address || 'Property Location',
            icon: {
              url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#dc2626" stroke="#ffffff" stroke-width="2"/>
                  <circle cx="12" cy="10" r="3" fill="#ffffff"/>
                </svg>
              `),
              scaledSize: new google.maps.Size(32, 32),
              anchor: new google.maps.Point(16, 32)
            }
          });

          marker.addListener('dragend', () => {
            const position = marker.getPosition();
            if (position) {
              onLocationChange(position.lat(), position.lng());
            }
          });

          mapInstanceRef.current = map;
          markerRef.current = marker;
        }

        setIsLoaded(true);
        setIsLoading(false);
        setError(null);
      } catch (error: any) {
        console.error('Error loading Google Maps:', error);
        setError('Failed to load Google Maps.');
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
    };
  }, []);

  useEffect(() => {
    if (mapInstanceRef.current && markerRef.current && isLoaded && !error) {
      const newPosition = { lat, lng };
      markerRef.current.setPosition(newPosition);
      mapInstanceRef.current.setCenter(newPosition);
    }
  }, [lat, lng, isLoaded, error]);

  if (isLoading) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Mapa no disponible</h3>
            <p className="text-sm text-amber-700 mt-1">{error}</p>
          </div>
        </div>
        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
          <div className="text-center text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3" />
            <p className="text-lg font-medium">Vista de mapa no disponible</p>
            <p className="text-sm mt-1">Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start space-x-2">
        <Info className="w-5 h-5 text-blue-600 mt-0.5" />
        <p className="text-sm text-blue-800">{t('location.map.instructions')}</p>
      </div>
      <div ref={mapRef} className="w-full h-64 rounded-lg border border-gray-300 shadow-sm" />
      <div className="text-xs text-gray-500 text-center">
        Coordenadas: {lat.toFixed(6)}, {lng.toFixed(6)}
      </div>
    </div>
  );
};

export default InteractiveMap;
