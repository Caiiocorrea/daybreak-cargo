export const DATA_BASE_CONFIGURATION = {
  mongoConnectionString: process.env.CLEAN_NEST_MONGO_CONNECTION_STRING as string,
};

export const JWT_CONFIGURATION = {
  secret: process.env.CLEAN_NEST_JWT_SECRET as string,
  expiresIn: process.env.CLEAN_NEST_JWT_EXPIRES_IN as string,
};
