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

  ngOnInit(): void {}

  private debug = effect(() => {
    console.log('value:', this.location());
    console.log('valid:', this.language());
  });

  async onSubmit() {
    const geoCodedWeatherQuery = await this.onGetGeoCodedWeather(); //calls weather service
    //todo: make this a global signal and use update to set the value
    // const formObject = { loc: this.location(), lang: this.language() };

    console.log('Here()', this._weatherService.geoCodeData());
  }

  async onGetGeoCodedWeather() {
    //todo: call weather service
    await this._weatherService.searchWeather(this.location(), this.language());
    return await this._weatherService.geoCodeData();
  }
}
