const Sequelize = require('sequelize')

const sequelize = new Sequelize('ClientsDB', 'AbnnerSales', '123456', { 
    host: 'localhost',
    dialect: 'postgres'
})

module.exports = sequelize
