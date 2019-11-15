const fs = require('fs') //look at paths and dir
const path = require('path') //work with paths and joins URLS
const Sequelize = require('sequelize')
const config = require('../config/config')

//Store all data from the database
const db = {}

//New Sequelize object where database details are passed through
const sequelize = new Sequelize(
    config.db.database,
    config.db.user,
    config.db.password,
    config.db.options
)

//All models in models folder are read and set up with sequelize
fs
.readdirSync(__dirname)
.filter((file) => file !== 'index.js') //tell not to read index.js
.forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model //set up model name 
})

//Access sequlize object and class respectfully
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db 
module.exports.Op=Sequelize.Op