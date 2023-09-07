"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_CONFIGURATION = exports.DATA_BASE_CONFIGURATION = void 0;
exports.DATA_BASE_CONFIGURATION = {
    mongoConnectionString: process.env.CLEAN_NEST_MONGO_CONNECTION_STRING,
};
exports.JWT_CONFIGURATION = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
};
//# sourceMappingURL=index.js.map