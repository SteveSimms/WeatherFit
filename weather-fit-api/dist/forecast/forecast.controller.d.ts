import { ForecastService } from './forecast.service';
export declare class ForecastController {
    private readonly forecastService;
    constructor(forecastService: ForecastService);
    findAll(): any;
    findOne(id: string): string;
    search(location: string, lang: string): Promise<any>;
    remove(id: string): string;
}
