export default () => ({
  host: process.env.DB_HOST,
  database: {
    port: parseInt(process.env.DB_PORT, 10) || 3000,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_DATABASE_NAME,
  },
  secret: process.env.JWT_SECRET,
});
