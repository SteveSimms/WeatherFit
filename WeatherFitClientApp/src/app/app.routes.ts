import { ResolveFn, Routes } from '@angular/router';
import { WeatherService } from './weather-page/services/weather.service';
import { inject } from '@angular/core';
import { weatherResolver } from './weather-page/resolvers/weather.resolver';

export const routes: Routes = [
  {
    loadComponent: () =>
      import('./weather-page/weather-search-page.component').then(
        (c) => c.WeatherSearchPageComponent,
      ),
    path: 'weather-search',
    resolve: { weatherResolver },
    //   resolve: {
    //     coordinate: getGeoData, //todo: get lat and long from browser via service
    //     geoLocation:{}
    //
    // }
  }, //: lazy load
  //todo: default route and not found
];

// resolver checks lat long(geolocation) show form to get the weather data if not handle some other responsibility like redirect
//keys must be different in resolver and component
//in most cases better to use OnInit to fetch data.
