import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PropertyFormData } from '../types';

// Define the context shape
interface FormContextType {
  formData: PropertyFormData;
  updateFormData: (data: Partial<PropertyFormData>) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  resetForm: () => void;
}

// Create the context
const FormContext = createContext<FormContextType | undefined>(undefined);

// Initial form state
const initialFormData: PropertyFormData = {
  listingType: 'sale',
  cobrokeAvailable: false,
  area: '',
  city: '',
  address: '',
  price: '',
  rooms: '3',
  baths: '2',
  lotSize: '',
  specialMessage: '',
  amenities: [],
  description: '',
  youtubeUrl: '',
  images: [],
  lat: undefined,
  lng: undefined,
};

// Provider component
export const FormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<PropertyFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);

  // Update form data
  const updateFormData = (data: Partial<PropertyFormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  // Reset form to initial state
  const resetForm = () => {
    setFormData(initialFormData);
    setCurrentStep(1);
  };

  return (
    <FormContext.Provider value={{
      formData,
      updateFormData,
      currentStep,
      setCurrentStep,
      resetForm,
    }}>
      {children}
    </FormContext.Provider>
  );
};

// Hook to consume context
export const useForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
