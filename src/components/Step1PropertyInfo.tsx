import React,{ useEffect, useRef, useState } from 'react';
import { useForm } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import { ROOM_OPTIONS, BATH_OPTIONS } from '../types';
import AddressAutocomplete from './AddressAutocomplete';
import CityAutocomplete from './CityAutocomplete';
import YouTubePreview from './YouTubePreview';
import InteractiveMap from './InteractiveMap';
import { Home, DollarSign, Bed, Bath, Square, MessageSquare, Youtube } from 'lucide-react';

const Step1PropertyInfo: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useForm();
  const { t } = useLanguage();
  
  const amenitiesTranslations = {
    'Control de acceso': t('amenities.access'),
    'Piscina': t('amenities.pool'),
    'Puerta de garage': t('amenities.garage'),
    'Cisterna': t('amenities.cistern'),
    'Calentador Solar': t('amenities.solar'),
    'Aire acondicionado': t('amenities.ac'),
    'Gazebo': t('amenities.gazebo'),
    'Area Recreativa': t('amenities.recreation'),
    'Family Room': t('amenities.family'),
    'Terraza': t('amenities.terrace')
  };
  useEffect(() => {
  console.log('formData updated:', formData);
}, [formData]);

  const handleInputChange = (field: string, value: any) => {
    updateFormData({ [field]: value });
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updatedAmenities = checked
      ? [...formData.amenities, amenity]
      : formData.amenities.filter(a => a !== amenity);
    updateFormData({ amenities: updatedAmenities });
  };

  const handleLocationChange = (lat: number, lng: number) => {
    updateFormData({ lat, lng });
  };

  const handleNext = () => {
    // Basic validation
    if (!formData.city || !formData.address || !formData.price) {
      alert(t('validation.required'));
      return;
    }
    setCurrentStep(2);
  };

  return (
    <div className="space-y-8">
      {/* Listing Type & Co-broke */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Home className="w-5 h-5 mr-2 text-blue-500" />
          {t('listing.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('listing.type')} <span className="text-red-500">{t('required')}</span>
            </label>
            <div className="space-y-2">
              {[
                { value: 'sale', label: t('listing.type.sale') },
                { value: 'rent', label: t('listing.type.rent') }
              ].map((option) => (
                <label key={option.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="listingType"
                    value={option.value}
                    checked={formData.listingType === option.value}
                    onChange={(e) => handleInputChange('listingType', e.target.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t('listing.coBroke')}
            </label>
            <div className="space-y-2">
              {[
                { value: true, label: t('listing.coBroke.yes') },
                { value: false, label: t('listing.coBroke.no') }
              ].map((option) => (
                <label key={option.value.toString()} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="cobrokeAvailable"
                    checked={formData.cobrokeAvailable === option.value}
                    onChange={() => handleInputChange('cobrokeAvailable', option.value)}
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-900">{option.label}</span>
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">{t('listing.coBroke.note')}</p>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('location.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('location.city')} <span className="text-red-500">{t('required')}</span>
            </label>
            <CityAutocomplete
              value={formData.city}
              onChange={(city) => handleInputChange('city', city)}
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('location.address')} <span className="text-red-500">{t('required')}</span>
          </label>
          <AddressAutocomplete
            value={formData.address}
            onChange={(address) => updateFormData({ address })}
            onSelect={(address, lat, lng) => updateFormData({ address, lat, lng })}
          />
        </div>
        
        {/* Interactive Map */}
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('location.map.title')}
            </label>
            <InteractiveMap
              lat={formData.lat}
              lng={formData.lng}
              onLocationChange={handleLocationChange}
              address={formData.address}
            />
          </div>
      
      </div>

      {/* Property Details */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('property.title')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t('property.price')} <span className="text-red-500">{t('required')}</span>
            </label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                placeholder={t('property.price.placeholder')}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('property.rooms')}</label>
            <div className="relative">
              <Bed className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.rooms}
                onChange={(e) => handleInputChange('rooms', e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {ROOM_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('property.baths')}</label>
            <div className="relative">
              <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select
                value={formData.baths}
                onChange={(e) => handleInputChange('baths', e.target.value)}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                {BATH_OPTIONS.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t('property.lotSize')}</label>
            <div className="relative">
              <Square className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="number"
                value={formData.lotSize}
                onChange={(e) => handleInputChange('lotSize', e.target.value)}
                placeholder={t('property.lotSize.placeholder')}
                className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Special Message */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <MessageSquare className="inline w-4 h-4 mr-1" />
          {t('special.message')}
        </label>
        <input
          type="text"
          value={formData.specialMessage}
          onChange={(e) => handleInputChange('specialMessage', e.target.value)}
          maxLength={40}
          placeholder={t('special.message.placeholder')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="text-xs text-gray-500 mt-1">{formData.specialMessage.length}/40 {t('characters')}</div>
      </div>

      {/* Amenities */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('amenities.title')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(amenitiesTranslations).map(([originalAmenity, translatedAmenity]) => (
            <label key={originalAmenity} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
              <input
                type="checkbox"
                checked={formData.amenities.includes(originalAmenity)}
                onChange={(e) => handleAmenityChange(originalAmenity, e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-900">{translatedAmenity}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {t('description.title')}
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          maxLength={800}
          rows={4}
          placeholder={t('description.placeholder')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        />
        <div className="text-xs text-gray-500 mt-1">{formData.description.length}/800 {t('characters')}</div>
      </div>

      {/* YouTube Video */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Youtube className="inline w-4 h-4 mr-1 text-red-500" />
          {t('youtube.title')}
        </label>
        <input
          type="url"
          value={formData.youtubeUrl}
          onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
          placeholder={t('youtube.placeholder')}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <YouTubePreview url={formData.youtubeUrl} />
      </div>

      {/* Next Button */}
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 flex items-center"
        >
          {t('button.next')}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Step1PropertyInfo;