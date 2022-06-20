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
  S3: {
    MAX_FILES: 10,
    S3_REGION: process.env.AWS_S3_REGION,
    S3_BUCKET: process.env.AWS_S3_BUCKET,
    S3_ACCESS_KEY: process.env.AWS_S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.AWS_S3_SECRET_KEY,
    S3_DOMAIN: `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com`,
    THUMBS: ['', ...process.env.AWS_S3_THUMBS.split(' ').filter((item) => item)],
  },
};
