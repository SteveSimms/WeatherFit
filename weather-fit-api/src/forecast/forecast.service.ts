import { Injectable } from '@nestjs/common';
import { weatherForecastResponse } from './utils/forecastUtil';
import { log } from 'node:console';
// import { CreateForecastDto } from './dto/create-forecast.dto';
// import { UpdateForecastDto } from './dto/update-forecast.dto';

@Injectable()
export class ForecastService {
  // create(createForecastDto: CreateForecastDto) {
  //   return 'This action adds a new forecast';
  // }

  findAll() {
    return weatherForecastResponse;
  }

  findOne(id: number) {
    return `This action returns a #${id} forecast`;
  }

  // update(id: number, updateForecastDto: UpdateForecastDto) {
  //   return `This action updates a #${id} forecast`;
  // }

  remove(id: number) {
    return `This action removes a #${id} forecast`;
  }

  async search(location: string, lang: string) {
    const res = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=${lang}&format=json`,
      // 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json',
      //todo: implement a way to retrieve the lat long from our location and recover the tempreture info https://api.open-meteo.com/v1/forecast?latitude=34.0522&longitude=-118.2437&hourly=temperature_2m pass the lat long dynamically to this endpoint
      { method: 'GET' },
    );
    const data = (await res).json();
    // console.log('data', data);
    return data;
    // return fetchGeoResponses(location, lang);
  }

  async searchTempretureByLatLong(latitude: number, longitude: number) {
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`,
      { method: 'GET' },
    );
    const data = await response.json();
    // console.log('Service', data);
    log('temp data ', data);
    return await data;
  }
}
