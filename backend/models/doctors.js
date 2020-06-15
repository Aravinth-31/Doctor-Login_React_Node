const Sequelize = require('sequelize');
const db = require('../config/database');

module.exports = db.define('doctors', {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
});