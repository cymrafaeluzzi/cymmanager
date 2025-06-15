import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import PropertyForm from '../components/PropertyForm';
import { useLanguage } from '../context/LanguageContext';

const EditListing: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();

  if (!id) {
    return <Navigate to="/my-listings" replace />;
  }

  // In a real app, you would fetch the listing data here
  // For now, we'll just show the form with a different title

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h2 className="text-lg font-semibold text-blue-900">
          {t('editListing.title')} - ID: {id}
        </h2>
        <p className="text-blue-700 text-sm mt-1">
          {t('editListing.subtitle')}
        </p>
      </div>
      
      <PropertyForm />
    </div>
  );
};

export default EditListing;