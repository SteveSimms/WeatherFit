import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { inject } from '@angular/core';

export let coordinates: any;
export const weatherResolver: ResolveFn<any> = async (route, state) => {
  const weatherService = inject(WeatherService);
  await weatherService.detectGeoLocationOnInit();
  console.log('weatherResolver', coordinates);
  return await weatherService.coordinates();
};

export const geoLocationResolver: ResolveFn<boolean> = () => {
  const weatherService = inject(WeatherService);
  coordinates = weatherService.coordinates();
  console.log('coordinates', coordinates);
  return true;
};
