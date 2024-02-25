import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WeatherFitClientApp';

  _weatherService = inject(WeatherService);
  weatherResponse: any = signal(this._weatherService);
  geoCodedWeatherResponse: any = signal(this._weatherService);

  ngOnInit(): void {
    const weather = this._weatherService.getWeather();
    this.weatherResponse.set(weather);
    const geoCodedWeather = this._weatherService.searchWeather('Menifee', 'en');
    this.geoCodedWeatherResponse.set(geoCodedWeather);
  }
}
