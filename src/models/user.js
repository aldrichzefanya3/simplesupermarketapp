const Sequalize = require('sequelize');

const sequelize = require('../helpers/databases/postgresql');

const User = sequelize.define('user', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    username: {
        type: Sequalize.STRING,
        allowNull: false
    },
    password: {
        type: Sequalize.STRING,
        allowNull: false
    }
});

module.exports = User;