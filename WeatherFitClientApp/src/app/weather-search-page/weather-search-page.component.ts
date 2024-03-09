import { FormsModule } from '@angular/forms';
import {
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
} from '@angular/core';
import { WeatherService } from '../weather.service';
import {
  createFormField,
  createFormGroup,
  SignalInputDirective,
  V,
} from 'ng-signal-forms';
import {Input} from "@angular/core";

@Component({
  selector: 'app-weather-search-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './weather-search-page.component.html', // Updated the templateUrl to the correct file path
  styleUrl: './weather-search-page.component.scss',
})
export class WeatherSearchPageComponent {
  _weatherService = inject(WeatherService);
  //todo: refactor to use signal forms or reactive form builder
  location = signal('');
  language = signal('');
  //todo: pass the  lat long to the wether service and get tmepreture info from the api
  lat = signal(0);
  long = signal(0);
  //todo: conditionally render table on click and display tempreture inofo
  isLocalTempData = signal(false);
  isSearchTableData = signal(false);
  currentLocalWeatherData = signal(null);

  @Input() coordinate = '';
  ngOnInit(): void {
    if (navigator.geolocation) {
      this.detectGeoLocationOnInit();
    }
    console.log('coordinate', this.coordinate);
  }

  private debug = effect(() => {
    console.log('value:', this.location());
    console.log('valid:', this.language());
  });

  async onSubmit() {
    const geoCodedWeatherQuery = await this.onGetGeoCodedWeather(); //calls weather service
    //todo: make this a global signal and use update to set the value
    // const formObject = { loc: this.location(), lang: this.language() };

    console.log('Here()', this._weatherService.geoCodeData().results);
  }

  async onGetGeoCodedWeather() {
    //todo: call weather service
    await this._weatherService.searchWeather(this.location(), this.language());
    return await this._weatherService.geoCodeData();
  }

  async detectGeoLocationOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.lat.set(latitude);
        this.long.set(longitude);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        await this.getWeatherByLatLong();
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }

  async getWeatherByLatLong() {
    await this._weatherService.searchWeatherByLatLong(this.lat(), this.long());
    console.log('HERE', this._weatherService.currentLocalWeatherData());
    return await this._weatherService.currentLocalWeatherData();
  }
}
