import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Import the HttpClient module
@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private http = inject(HttpClient); // Inject the HttpClient module
  public geoCodeData: any = signal([]);
  public currentLocalWeatherData: any = signal(null);

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
      this.geoCodeData.update(() => data);
      console.log('Geo signal', this.geoCodeData());
      return this.geoCodeData();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
  async searchWeatherByLatLong(lat: number, long: number) {
    try {
      // const response = await fetch(
      //   `http://localhost:3000/api/forecast/tempreture/${lat}/${long}`,
      // );
      //

      const response = await fetch(
        `http://localhost:3000/api/forecast/tempreture/${lat}/${long}`,
      );

      const data = await response.json();

      this.currentLocalWeatherData.set(data);
      console.log(this.currentLocalWeatherData());
      return this.currentLocalWeatherData();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  lat = signal(0);
  long = signal(0);
  coordinates = signal({});
  async detectGeoLocationOnInit() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        this.lat.set(latitude);
        this.long.set(longitude);
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        await this.searchWeatherByLatLong(this.lat(), this.long());
        this.coordinates.set({ lat: this.lat(), long: this.long() });
      });
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}
