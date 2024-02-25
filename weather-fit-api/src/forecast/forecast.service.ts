import { Injectable } from '@nestjs/common';
import {
  weatherForecastResponse,
  geoCodedForecastResponse,
  fetchGeoResponses,
} from './utils/forecastUtil';
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
      { method: 'GET' },
    );
    const data = (await res).json();
    console.log('data', data);
    return data;
    // return fetchGeoResponses(location, lang);
  }
}
