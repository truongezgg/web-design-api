export default {
  SERVER: {
    API_URL: process.env.API_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: Number(process.env.PORT),
  },
  MONGO: {
    URI: process.env.MONGO_URI,
  },
  AUTH: {
    SECRET: process.env.AUTH_SECRET,
    ADMIN_TOKEN: process.env.ADMIN_TOKEN,
    SALT_ROUND: Number(process.env.SALT_ROUND),
    TOKEN_TTL: process.env.TOKEN_TTL,
    REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL,
  },
};
