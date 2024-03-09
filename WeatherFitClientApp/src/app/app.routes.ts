import { Routes } from '@angular/router';

export const routes: Routes = [
  { loadComponent: () => import ('./weather-search-page/weather-search-page.component').then((c)=> c.WeatherSearchPageComponent ), path: 'weather-search',
    data: {
      coordinate: -112, long: 110293,
      geoLocation:{}

  } }, //: lazy load
  //todo: default route and not found
];

// resolver checks lat long(geolocation) show form to get the weather data if not handle some other responsibility like redirect
//keys must be different in resolver and component
//in most cases better to use OnInit to fetch data.
