/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
*/

'use strict'

//methods for fetching mysql data

const mysql     = require('../../connections/mysql/MySQLConnect');


// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};
db.Sequelize = mysql.Sequelize;
db.mysql     = mysql;

// initialize database connection
db.mysql.init();

//Models/tables
db.region     = require('./region.js')(db.mysql,     db.Sequelize); 
db.state      = require('./state.js')(db.mysql,      db.Sequelize); 
db.city       = require('./city.js')(db.mysql,       db.Sequelize); 
db.product    = require('./product.js')(db.mysql,    db.Sequelize); 
db.user       = require('./user.js')(db.mysql,       db.Sequelize); 
db.donation   = require('./donation.js')(db.mysql,   db.Sequelize); 
db.historical = require('./historical.js')(db.mysql, db.Sequelize); 

//Relations
db.region.hasMany(db.state); 
db.state.belongsTo(db.region); 

db.state.hasMany(db.city);
db.city.belongsTo(db.state);

db.donation.belongsTo(db.product);
db.donation.belongsTo(db.user);
db.donation.belongsTo(db.city);
db.product.hasMany(db.donation);
db.user.hasMany(db.donation);
db.city.hasMany(db.donation);

db.historical.belongsTo(db.donation);
db.donation.hasMany(db.historical);

module.exports = db; 
