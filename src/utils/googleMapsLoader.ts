import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = 'AIzaSyBgog7bBFpWCgh-oSg4wgzxqPJ97kgUlfU';

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly',
  libraries: ['places'],
  id: '__googleMapsScriptId'
});

// Add error handling and debugging
loader.load().then(() => {
  console.log('Google Maps API loaded successfully');
}).catch((error) => {
  console.error('Failed to load Google Maps API:', error);
});

export default loader;