import { Loader } from '@googlemaps/js-api-loader';

const API_KEY = 'AIzaSyBgog7bBFpWCgh-oSg4wgzxqPJ97kgUlfU';

const loader = new Loader({
  apiKey: API_KEY,
  version: 'weekly', // or 'beta', just be consistent
  libraries: ['places'],
  id: '__googleMapsScriptId'
});

export default loader;