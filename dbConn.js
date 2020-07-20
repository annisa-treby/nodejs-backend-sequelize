const dotenv = require('dotenv');
const Sequelize = require('sequelize')

dotenv.config();
const connection = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        dialect: process.env.DB_TYPE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

module.exports = connection;