import { FormsModule } from '@angular/forms';
import {
  Component,
  WritableSignal,
  effect,
  inject,
  signal,
  Output,
} from '@angular/core';
import { WeatherService } from './services/weather.service';
import {
  createFormField,
  createFormGroup,
  SignalInputDirective,
  V,
} from 'ng-signal-forms';
import { Input } from '@angular/core';
import { SearchResultsComponent } from './components/weather-search-results/weather-search-results.component';

@Component({
  selector: 'app-weather-search-page',
  standalone: true,
  imports: [FormsModule, SearchResultsComponent],
  templateUrl: './weather-search-page.component.html', // Updated the templateUrl to the correct file path
  styleUrl: './weather-search-page.component.scss',
})
export class WeatherSearchPageComponent {
  protected _weatherService = inject(WeatherService);
  @Output() results = signal([]);

  protected location = signal('');
  protected language = signal('');

  protected lat = signal(0);
  protected long = signal(0);

  protected isLocalTempData = signal(false);
  protected isSearchTableData = signal(false);
  protected currentLocalWeatherData = signal(null);
  protected isLocationSelected = signal(false);

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

  protected async onSubmit() {
    const geoCodedWeatherQuery = await this.onGetGeoCodedWeather(); //calls weather service
    //todo: make this a global signal and use update to set the value
    // const formObject = { loc: this.location(), lang: this.language() };

    console.log('Here()', this._weatherService.geoCodeData().results);
    if (this._weatherService.geoCodeData().results) {
      this.isLocationSelected.set(true);
    }
  }

  protected async onGetGeoCodedWeather() {
    //todo: call weather service
    await this._weatherService.searchWeather(this.location(), this.language());
    return await this._weatherService.geoCodeData();
  }

  protected async detectGeoLocationOnInit() {
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

  protected async getWeatherByLatLong() {
    await this._weatherService.searchWeatherByLatLong(this.lat(), this.long());
    console.log('HERE', this._weatherService.currentLocalWeatherData());
    return await this._weatherService.currentLocalWeatherData();
  }
}
