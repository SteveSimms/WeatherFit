import { WeatherService } from '../../../services/weather.service';
import { OpenAiService } from '../../../services/open-ai.service';
import { Component, SimpleChanges, inject, input } from '@angular/core';

@Component({
  selector: 'display-location',
  standalone: true,
  imports: [],
  template: `
    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">{{ selectedLocation().name }}</h2>
        <p>Click to see outfit options for {{ selectedLocation().name }}</p>
        <div class="card-actions justify-end">
          <button (click)="getWeatherSuggestions()" class="btn btn-primary">
            Get Suggestions
          </button>
          <button class="btn btn-ghost">Deny</button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './weather-display-location.component.css',
})
export class DisplayLocationComponent {
  protected selectedLocation = input.required<any>();
  protected aiWeatherService = inject(OpenAiService);
  protected weatherService = inject(WeatherService);
  ngOnInit(): void {
    console.log('Set location', this.selectedLocation());
    console.log(this.aiWeatherService.clothingSuggestions());
  }
  protected getWeatherSuggestions() {
    this.aiWeatherService.getClothingSuggestions(
      this.selectedLocation().name,
      80,
    );
    this.weatherService.searchWeatherByLatLong(
      this.selectedLocation().latitude,
      this.selectedLocation().longitude,
    ),
      console.log('her3e', this.aiWeatherService.clothingSuggestions());
    console.log(
      'currentLocalWeatherData()',
      this.weatherService.currentLocalWeatherData(),
    );
  }
}

// export function stuufIDontWantToReadInTheComponent() {
//   let dataOptions = {
//     selectedLocation: input.required<any>(),
//     aiWeatherService: inject(OpenAiService),
//     weatherService: inject(WeatherService),
//   };

//   const getWeatherSuggestions = () => {
//     dataOptions.aiWeatherService.getClothingSuggestions(
//       selectedLocation().name,
//       80,
//     );
//     dataOptions.weatherService.searchWeatherByLatLong(
//       selectedLocation().latitude,
//       selectedLocation().longitude,
//     ),
//       console.log('her3e', aiWeatherService.clothingSuggestions());
//     console.log(
//       'currentLocalWeatherData()',
//       weatherService.currentLocalWeatherData(),
//     );
//   };
// }
