import React from 'react';
import { useForm } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import ProgressIndicator from './ProgressIndicator';
import Step1PropertyInfo from './Step1PropertyInfo';
import Step2MediaUpload from './Step2MediaUpload';
import LanguageSelector from './LanguageSelector';

const PropertyForm: React.FC = () => {
  const { currentStep } = useForm();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            {t('header.title')}
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            {t('header.subtitle')}
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={currentStep} totalSteps={2} />

        {/* Form Steps */}
        <div className="transition-all duration-500 ease-in-out">
          {currentStep === 1 && <Step1PropertyInfo />}
          {currentStep === 2 && <Step2MediaUpload />}
        </div>
      </div>
    </div>
  );
};

export default PropertyForm;