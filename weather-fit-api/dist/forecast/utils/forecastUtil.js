"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchGeoResponses = exports.geoCodedForecastResponse = exports.weatherForecastResponse = void 0;
const openmeteo_1 = require("openmeteo");
let weatherForecastResponse;
let geoCodedForecastResponse;
const node_fetch_1 = __importDefault(require("node-fetch"));
const fetchGeoResponses = async (location, lang) => {
    let geoCodeUrl;
    if (location) {
        geoCodeUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=10&language=${lang}&format=json`;
    }
    else {
        return null;
    }
    const response = await (0, node_fetch_1.default)(geoCodeUrl);
    const data = await response.json();
    exports.geoCodedForecastResponse = geoCodedForecastResponse = data;
    return data;
};
exports.fetchGeoResponses = fetchGeoResponses;
(async () => {
    const params = {
        latitude: 52.52,
        longitude: 13.41,
        hourly: 'temperature_2m',
    };
    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await (0, openmeteo_1.fetchWeatherApi)(url, params);
    const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
    const response = responses[0];
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
    const hourly = response.hourly();
    const weatherData = {
        hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
            temperature2m: hourly.variables(0).valuesArray(),
        },
    };
    const weatherDataResponse = (wd) => wd;
    for (let i = 0; i < weatherData.hourly.time.length; i++) {
        exports.weatherForecastResponse = weatherForecastResponse = weatherDataResponse(weatherData);
    }
})();
//# sourceMappingURL=forecastUtil.js.map