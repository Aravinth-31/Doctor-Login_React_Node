const Sequelize = require('sequelize');
module.exports = new Sequelize('postgres', 'postgres', 'Aravipost', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 9,
    min: 0,
    idle: 10000
  }
});
