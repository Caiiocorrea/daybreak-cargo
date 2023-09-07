"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordesProviders = void 0;
const orders_model_1 = require("./model/orders.model");
exports.ordesProviders = [
    {
        provide: 'ORDERS_REPOSITORY',
        useValue: orders_model_1.default,
    },
];
//# sourceMappingURL=orders.provedores.js.map