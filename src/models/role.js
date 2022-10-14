const Sequalize = require('sequelize');

const sequelize = require('../helpers/databases/postgresql');

const Role = sequelize.define('role', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    description: {
        type: Sequalize.STRING,
        allowNull: false
    }
});

module.exports = Role;