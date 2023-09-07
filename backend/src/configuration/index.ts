export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: process.env.CLEAN_NEST_MONGO_CONNECTION_STRING as string,
};

export const JWT_CONFIGURATION = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};

export const twilioConfiguration = {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  from: process.env.TWILIO_FROM,
};
