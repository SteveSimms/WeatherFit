declare let weatherForecastResponse: any;
declare let geoCodedForecastResponse: any;
declare const fetchGeoResponses: (location: any, lang: any) => Promise<any>;
export { weatherForecastResponse, geoCodedForecastResponse, fetchGeoResponses };
