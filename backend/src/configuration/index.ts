export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: process.env.CLEAN_NEST_MONGO_CONNECTION_STRING as string,
};

export const JWT_CONFIGURATION = {
  secret: process.env.JWT_SECRET_KEY,
  expiresIn: process.env.JWT_EXPIRES_IN,
};
