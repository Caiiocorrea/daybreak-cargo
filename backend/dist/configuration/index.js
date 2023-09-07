"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.twilioConfiguration = exports.JWT_CONFIGURATION = exports.DATA_BASE_CONFIGURATION = void 0;
exports.DATA_BASE_CONFIGURATION = {
    mongoConnectionString: process.env.CLEAN_NEST_MONGO_CONNECTION_STRING,
};
exports.JWT_CONFIGURATION = {
    secret: process.env.JWT_SECRET_KEY,
    expiresIn: process.env.JWT_EXPIRES_IN,
};
exports.twilioConfiguration = {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    from: process.env.TWILIO_FROM,
};
//# sourceMappingURL=index.js.map