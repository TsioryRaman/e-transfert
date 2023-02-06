// configuration.ts

export const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
     jwt: {
      secret: process.env.JWT_SECRET,
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
    DATABASE_HOST:process.env.DATABASE_HOST,
    DATABASE_PORT:process.env.DATABASE_PORT,
    DB_USER:process.env.DB_USER,
    DB_PASSWORD:process.env.DB_PASSWORD,
    DB_NAME:process.env.DB_NAME,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_ECPIRE_TIME:process.env.JWT_EXPIRE_TIME
  });
  