"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersProviders = void 0;
const users_model_1 = require("./model/users.model");
exports.usersProviders = [
    {
        provide: 'USERS_REPOSITORY',
        useValue: users_model_1.default,
    },
];
//# sourceMappingURL=users.provedores.js.map