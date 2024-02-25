// import { fetchWeatherApi } from 'openmeteo';

// let weatherForecastResponse;

// (async () => {
//   const params = {
//     latitude: 52.52,
//     longitude: 13.41,
//     hourly: 'temperature_2m',
//   };
//   const url = 'https://api.open-meteo.com/v1/forecast';
//   const responses = await fetchWeatherApi(url, params);

//   // Helper function to form time ranges
//   const range = (start: number, stop: number, step: number) =>
//     Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

//   // Process first location. Add a for-loop for multiple locations or weather models
//   const response = responses[0];

//   // Attributes for timezone and location
//   const utcOffsetSeconds = response.utcOffsetSeconds();
//   const timezone = response.timezone();
//   const timezoneAbbreviation = response.timezoneAbbreviation();
//   const latitude = response.latitude();
//   const longitude = response.longitude();

//   const hourly = response.hourly()!;

//   // Note: The order of weather variables in the URL query and the indices below need to match!
//   const weatherData = {
//     hourly: {
//       time: range(
//         Number(hourly.time()),
//         Number(hourly.timeEnd()),
//         hourly.interval(),
//       ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
//       temperature2m: hourly.variables(0)!.valuesArray()!,
//     },
//   };
//   const weatherDataResponse = (wd) => wd;
//   // `weatherData` now contains a simple structure with arrays for datetime and weather data
//   for (let i = 0; i < weatherData.hourly.time.length; i++) {
//     console.log(
//       weatherData.hourly.time[i].toISOString(),
//       weatherData.hourly.temperature2m[i],
//     );

//     weatherForecastResponse = weatherDataResponse(weatherData);
//   }
// })();

// export { weatherForecastResponse };

import { fetchWeatherApi } from 'openmeteo';

let weatherForecastResponse;
let geoCodedForecastResponse;

// const fetchGeoResponses = async (location, lang) => {
//   let geoCodeUrl = 'https://api.open-meteo.com/v1/forecast';
//   const params = {
//     latitude: 52.52,
//     longitude: 13.41,
//     hourly: 'temperature_2m',
//   };

//   // If location is present, use the geocoding API
//   if (location) {
//     geoCodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=$location}&count=10&language=${lang}&format=json`;
//   }

//   const responses = await fetchWeatherApi(geoCodeUrl, params);
//   // rest of your code...
//   return responses;
// };

import fetch from 'node-fetch';

const fetchGeoResponses = async (location, lang) => {
  let geoCodeUrl;

  // If location is present, use the geocoding API
  if (location) {
    geoCodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=10&language=${lang}&format=json`;
  } else {
    return null;
  }

  const response = await fetch(geoCodeUrl);
  const data = await response.json();
  // rest of your code...
  geoCodedForecastResponse = data;
  return data;
};

(async () => {
  const params = {
    latitude: 52.52,
    longitude: 13.41,
    hourly: 'temperature_2m',
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) =>
    Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  const timezone = response.timezone();
  const timezoneAbbreviation = response.timezoneAbbreviation();
  const latitude = response.latitude();
  const longitude = response.longitude();

  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(
        Number(hourly.time()),
        Number(hourly.timeEnd()),
        hourly.interval(),
      ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      temperature2m: hourly.variables(0)!.valuesArray()!,
    },
  };
  const weatherDataResponse = (wd) => wd;
  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(
      weatherData.hourly.time[i].toISOString(),
      weatherData.hourly.temperature2m[i],
    );

    weatherForecastResponse = weatherDataResponse(weatherData);
  }

  // Call fetchGeoResponses with location and language
  // geoCodedForecastResponse = await fetchGeoResponses('Menifee', 'en');
})();

export { weatherForecastResponse, geoCodedForecastResponse, fetchGeoResponses };
