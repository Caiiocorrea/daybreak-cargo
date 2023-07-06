"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesProviders = void 0;
const vehicles_model_1 = require("./model/vehicles.model");
exports.vehiclesProviders = [
    {
        provide: 'VEHICLE_REPOSITORY',
        useValue: vehicles_model_1.default,
    },
];
//# sourceMappingURL=vehicles.provedores.js.map