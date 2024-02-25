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
  template: `<div>
      <label for="location">Location</label>
      <input [(ngModel)]="location" id="location" />
    </div>

    <div>
      <label for="language">Language</label>
      <input type="text" [(ngModel)]="language" id="language" />
    </div>

    <button (click)="onSubmit()">Search</button>`,
  styleUrl: './weather-search-page.component.scss',
})
export class WeatherSearchPageComponent {
  _weatherService = inject(WeatherService);
  geoCodedWeatherResponse: any = signal(this._weatherService);

  location = signal('');
  language = signal('');

  formModel = createFormGroup({
    location: createFormField(''),
    language: createFormField(''),
  });

  ngOnInit(): void {
    // const geoCodedWeather = this._weatherService.searchWeather('Menifee', 'en');
    // this.geoCodedWeatherResponse.set(geoCodedWeather);
  }

  private debug = effect(() => {
    console.log('value:', this.formModel.value());
    console.log('valid:', this.formModel.valid());
  });

  onSubmit() {
    const geoCodedWeather = this._weatherService.searchWeather(
      this.location(),
      this.language(),
    );
    const formObject = { loc: this.location(), lang: this.language() };
    this.geoCodedWeatherResponse.set(geoCodedWeather);
    console.log(formObject);
  }
}
