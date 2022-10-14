const Sequalize = require('sequelize');

const sequelize = require('../helpers/databases/postgresql');

const Product = sequelize.define('product', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequalize.STRING,
        allowNull: false
    },
    amount: {
        type: Sequalize.STRING,
        allowNull: false
    },
    reason: {
        type: Sequalize.STRING,
        allowNull: true
    },
    approverId: {
        type: Sequalize.INTEGER
    }
});

module.exports = Product;