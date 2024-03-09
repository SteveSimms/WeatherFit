"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastService = void 0;
const common_1 = require("@nestjs/common");
const forecastUtil_1 = require("./utils/forecastUtil");
const node_console_1 = require("node:console");
let ForecastService = class ForecastService {
    findAll() {
        return forecastUtil_1.weatherForecastResponse;
    }
    findOne(id) {
        return `This action returns a #${id} forecast`;
    }
    remove(id) {
        return `This action removes a #${id} forecast`;
    }
    async search(location, lang) {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=${lang}&format=json`, { method: 'GET' });
        const data = (await res).json();
        return data;
    }
    async searchTempretureByLatLong(latitude, longitude) {
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`, { method: 'GET' });
        const data = await response.json();
        (0, node_console_1.log)('temp data ', data);
        return await data;
    }
};
exports.ForecastService = ForecastService;
exports.ForecastService = ForecastService = __decorate([
    (0, common_1.Injectable)()
], ForecastService);
//# sourceMappingURL=forecast.service.js.map