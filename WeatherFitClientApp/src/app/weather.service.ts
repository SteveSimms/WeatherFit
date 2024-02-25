import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient); // Inject the HttpClient module

  async getWeather() {
    try {
      const response = fetch('http://localhost:3000/api/forecast');
      const data = await (await response).json();
      console.log('Here', data);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  async searchWeather(location: string, lang: string) {
    try {
      const response = fetch(
        `http://localhost:3000/api/forecast/${location}/${lang}`,
      );
      const data = await (await response).json();
      console.log('Geo', data);
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
}
