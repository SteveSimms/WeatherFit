import { ForecastService } from './forecast.service';
export declare class ForecastController {
    private readonly forecastService;
    constructor(forecastService: ForecastService);
    findAll(): any;
    findOne(id: string): string;
    remove(id: string): string;
}
