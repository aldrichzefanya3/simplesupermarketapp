const Sequelize = require('sequelize');

const DB_NAME = "simplesupermarketapp";
const USERNAME = "postgres";
const PASSWORD = "admin123";

const sequelize = new Sequelize(DB_NAME, USERNAME, PASSWORD, {  
    dialect: 'postgres',
    logging: false
})

module.exports = sequelize;