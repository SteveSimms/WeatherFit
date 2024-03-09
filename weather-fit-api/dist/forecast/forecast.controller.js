"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForecastController = void 0;
const common_1 = require("@nestjs/common");
const forecast_service_1 = require("./forecast.service");
let ForecastController = class ForecastController {
    forecastService;
    constructor(forecastService) {
        this.forecastService = forecastService;
    }
    findAll() {
        return this.forecastService.findAll();
    }
    findOne(id) {
        return this.forecastService.findOne(+id);
    }
    search(location, lang) {
        console.log(location, lang);
        return this.forecastService.search(location, lang);
    }
    async searchTempretureByLatLong(latitude, longitude) {
        return await this.forecastService.searchTempretureByLatLong(latitude, longitude);
    }
    remove(id) {
        return this.forecastService.remove(+id);
    }
};
exports.ForecastController = ForecastController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':location/:lang'),
    __param(0, (0, common_1.Param)('location')),
    __param(1, (0, common_1.Param)('lang')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "search", null);
__decorate([
    (0, common_1.Get)('tempreture/:latitude/:longitude'),
    __param(0, (0, common_1.Param)('latitude')),
    __param(1, (0, common_1.Param)('longitude')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ForecastController.prototype, "searchTempretureByLatLong", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ForecastController.prototype, "remove", null);
exports.ForecastController = ForecastController = __decorate([
    (0, common_1.Controller)('api/forecast'),
    __metadata("design:paramtypes", [forecast_service_1.ForecastService])
], ForecastController);
//# sourceMappingURL=forecast.controller.js.map