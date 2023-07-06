"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passengersProviders = void 0;
const passengers_model_1 = require("./model/passengers.model");
exports.passengersProviders = [
    {
        provide: 'PASSENGERS_REPOSITORY',
        useValue: passengers_model_1.default,
    },
];
//# sourceMappingURL=passengers.provedores.js.map