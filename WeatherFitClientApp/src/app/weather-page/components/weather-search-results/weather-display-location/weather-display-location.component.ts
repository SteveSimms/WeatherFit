import { WeatherService } from '../../../services/weather.service';
import { OpenAiService } from '../../../services/open-ai.service';
import { Component, SimpleChanges, inject, input, signal } from '@angular/core';

@Component({
  selector: 'display-location',
  standalone: true,
  imports: [],
  template: `
    <div class="card w-96 bg-neutral text-neutral-content">
      <div class="card-body items-center text-center">
        <h2 class="card-title">{{ selectedLocation().name }}</h2>
        @if (isClothingSuggestions()) {
          <p>
            {{ aiWeatherService.clothingSuggestions().suggestion }}
          </p>
        }

        <div class="card-actions justify-end">
          <button (click)="getWeatherSuggestions()" class="btn btn-primary">
            See Suggestions {{ toggleSuggestions() }}
          </button>
          <button (click)="toggleSuggestionsVisibility()" class="btn btn-ghost">
            Hide Suggestions
          </button>
        </div>
      </div>
    </div>
  `,
  styleUrl: './weather-display-location.component.css',
})
export class DisplayLocationComponent {
  selectedLocation = input.required<any>();
  aiWeatherService = inject(OpenAiService);
  weatherService = inject(WeatherService);
  isClothingSuggestions = signal<boolean>(false);
  toggleSuggestions = signal<boolean>(false);
  ngOnInit(): void {
    console.log('Set location', this.selectedLocation());
    console.log(this.aiWeatherService.clothingSuggestions());
  }
  protected getWeatherSuggestions() {
    this.weatherService.searchWeatherByLatLong(
      this.selectedLocation().latitude,
      this.selectedLocation().longitude,
    ),
      this.aiWeatherService.getClothingSuggestions(
        this.selectedLocation().name,
        this.weatherService.currentLocalWeatherData().current.temperature_2m,
      );

    console.log('her3e', this.aiWeatherService.clothingSuggestions());
    console.log(
      'currentLocalWeatherData()',
      this.weatherService.currentLocalWeatherData(),
    );
    this.isClothingSuggestions.set(true);
  }

  toggleSuggestionsVisibility() {
    this.toggleSuggestions.set(true);
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

// current: {
//     time: '2024-04-21T22:00',
//     interval: 900,
//     temperature_2m: 29.8
//   }
