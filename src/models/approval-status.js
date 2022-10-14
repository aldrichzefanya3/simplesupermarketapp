const Sequalize = require('sequelize');

const sequelize = require('../helpers/databases/postgresql');

const ApprovalStatus = sequelize.define('approvalStatus', {
    id: {
        type: Sequalize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequalize.STRING,
        allowNull: false
    }
});

module.exports = ApprovalStatus;