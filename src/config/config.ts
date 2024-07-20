export default () => ({
  port: process.env.PORT,
  databaseUrl: process.env.POSTGRESQL_URL,
  jwtSecretKey: process.env.JWT_SECRET_KEY,
});
