import React, { useState, useEffect } from 'react';
import { Play, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface YouTubePreviewProps {
  url: string;
}

const YouTubePreview: React.FC<YouTubePreviewProps> = ({ url }) => {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const { t } = useLanguage();

  useEffect(() => {
    if (!url) {
      setVideoId(null);
      setIsValid(false);
      return;
    }

    // Extract YouTube video ID from various URL formats
    const extractVideoId = (url: string): string | null => {
      const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
        /youtube\.com\/v\/([^&\n?#]+)/
      ];

      for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match) {
          return match[1];
        }
      }
      return null;
    };

    const id = extractVideoId(url);
    setVideoId(id);
    setIsValid(!!id);
  }, [url]);

  if (!url) return null;

  if (!isValid) {
    return (
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <span className="text-red-700 text-sm">
          {t('youtube.invalid')}
        </span>
      </div>
    );
  }

  return (
    <div className="mt-2">
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt="YouTube video thumbnail"
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors cursor-pointer">
            <Play className="h-6 w-6 text-white" fill="white" />
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-600 mt-1">
        {t('youtube.preview')}
      </p>
    </div>
  );
};

export default YouTubePreview;