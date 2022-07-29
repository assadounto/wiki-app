import http from './http-common';
import http2 from './http2';

const getAll = () => http.get('all');
const getCountry = (name) => http.get(`name/${name}`);
const getPollution = (lon, lat) => http2.get(`air_pollution?lat=${lat}&lon=${lon}&appid=1b17078bca47e02f9f4a886ba046460f`);
const countriesService = {
  getAll,
  getPollution,
  getCountry,
};
export default countriesService;
