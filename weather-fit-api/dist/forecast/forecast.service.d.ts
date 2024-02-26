export declare class ForecastService {
    findAll(): any;
    findOne(id: number): string;
    remove(id: number): string;
    search(location: string, lang: string): Promise<any>;
    searchTempretureByLatLong(latitude: number, longitude: number): Promise<any>;
}
