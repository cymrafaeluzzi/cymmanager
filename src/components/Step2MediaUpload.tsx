import React, { useEffect, useRef } from 'react';
import Uppy from '@uppy/core';
import Dashboard from '@uppy/dashboard';
import { DashboardModal } from '@uppy/react';
import ImageEditor from '@uppy/image-editor';
import Webcam from '@uppy/webcam';
import { useForm } from '../context/FormContext';
import { useLanguage } from '../context/LanguageContext';
import { ArrowLeft, Upload, Camera, Edit3 } from 'lucide-react';

import '@uppy/core/dist/style.min.css';
import '@uppy/dashboard/dist/style.min.css';
import '@uppy/image-editor/dist/style.min.css';
import '@uppy/webcam/dist/style.min.css';

const Step2MediaUpload: React.FC = () => {
  const { formData, updateFormData, setCurrentStep } = useForm();
  const { t } = useLanguage();
  const uppyRef = useRef<Uppy | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = React.useState(false);

  useEffect(() => {
    // Only initialize Uppy if it doesn't already exist
    if (!uppyRef.current) {
      const uppy = new Uppy({
        id: 'property-uploader',
        autoProceed: false,
        allowMultipleUploads: true,
        restrictions: {
          maxFileSize: 10 * 1024 * 1024, // 10MB
          maxNumberOfFiles: 20,
          allowedFileTypes: ['image/*', 'video/mp4', 'video/quicktime', 'video/x-msvideo']
        }
      });

      // First add the Dashboard plugin
      uppy.use(Dashboard, {
        inline: false,
        target: 'body',
        showProgressDetails: true,
        proudlyDisplayPoweredByUppy: false,
        theme: 'light',
        note: t('media.req.size').replace('• ', ''),
        metaFields: [
          { id: 'caption', name: 'Caption', placeholder: 'Optional caption for this media' }
        ]
      });

      // Get the Dashboard plugin instance for proper targeting
      const dashboardPlugin = uppy.getPlugin('Dashboard');

      // Now add other plugins targeting the Dashboard instance
      if (dashboardPlugin) {
        uppy.use(ImageEditor, {
          target: dashboardPlugin,
          quality: 0.8
        });

        uppy.use(Webcam, {
          target: dashboardPlugin,
          showVideoSourceDropdown: true,
          showRecordingLength: true
        });
      }

      uppy.on('file-added', (file) => {
        console.log('File added:', file.name);
      });

      uppy.on('files-added', (files) => {
        console.log('Files added:', files.length);
        // Convert Uppy files to regular File objects for our form state
        const fileObjects = files.map(file => file.data as File);
        updateFormData({ images: [...formData.images, ...fileObjects] });
      });

      uppy.on('file-removed', (file) => {
        console.log('File removed:', file.name);
        const updatedImages = formData.images.filter(img => img.name !== file.name);
        updateFormData({ images: updatedImages });
      });

      uppyRef.current = uppy;
    }

    return () => {
      // Safely close the Uppy instance
      if (uppyRef.current) {
        uppyRef.current.close();
        uppyRef.current = null;
      }
    };
  }, []);

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handlePublish = () => {
    // Here you would typically submit the form data to your backend
    console.log('Publishing property:', formData);
    alert(t('validation.success'));
  };

  const openDashboard = () => {
    setIsDashboardOpen(true);
  };

  const closeDashboard = () => {
    setIsDashboardOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {t('media.title')}
        </h3>
        <p className="text-gray-600">
          {t('media.subtitle')}
        </p>
      </div>

      {/* Upload Area */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <Upload className="w-8 h-8 text-[#e24a37]" />
          </div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            {t('media.upload.title')}
          </h4>
          <p className="text-gray-600 mb-6">
            {t('media.upload.subtitle')}
          </p>
          
          <button
            onClick={openDashboard}
            className="inline-flex items-center px-6 py-3 bg-[#e24a37] text-white font-semibold rounded-lg hover:bg-red-700 focus:ring-4 focus:ring-red-200 transition-all duration-200 mr-4"
          >
            <Upload className="w-5 h-5 mr-2" />
            {t('media.choose')}
          </button>

          <button
            onClick={openDashboard}
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200"
          >
            <Camera className="w-5 h-5 mr-2" />
            {t('media.camera')}
          </button>
        </div>

        {/* File Requirements */}
        <div className="mt-8 bg-gray-50 rounded-lg p-4">
          <h5 className="font-medium text-gray-900 mb-2">{t('media.requirements')}</h5>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>{t('media.req.formats')}</li>
            <li>{t('media.req.size')}</li>
            <li>{t('media.req.count')}</li>
            <li>{t('media.req.main')}</li>
            <li>{t('media.req.resolution')}</li>
            <li>{t('media.req.editor')}</li>
          </ul>
        </div>
      </div>

      {/* Uploaded Files Preview */}
      {formData.images.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">
            {t('media.uploaded')} ({formData.images.length})
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {formData.images.map((file, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  {file.type.startsWith('image/') ? (
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Upload ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                  )}
                  {index === 0 && (
                    <div className="absolute top-2 left-2 bg-[#e24a37] text-white px-2 py-1 rounded text-xs font-medium">
                      {t('media.main')}
                    </div>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-600 truncate">
                  {file.name}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={openDashboard}
            className="mt-4 inline-flex items-center px-4 py-2 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            {t('media.edit')}
          </button>
        </div>
      )}

      {/* Uppy Dashboard Modal */}
      {uppyRef.current && (
        <DashboardModal
          uppy={uppyRef.current}
          open={isDashboardOpen}
          onRequestClose={closeDashboard}
          plugins={['Dashboard']}
        />
      )}

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="inline-flex items-center px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 focus:ring-4 focus:ring-gray-200 transition-all duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          {t('button.back')}
        </button>
        
        <button
          onClick={handlePublish}
          className="inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-200 transition-all duration-200"
        >
          {t('button.publish')}
          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Step2MediaUpload;