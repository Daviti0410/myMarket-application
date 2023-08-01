const { DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST } = process.env;

module.exports = {
  name: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  host: DB_HOST,
}