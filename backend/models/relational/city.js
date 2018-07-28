/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
*/

'use strict'

module.exports = (sequelize, DataTypes) => {  

    const City = sequelize.pool.define('city', {
        name:     DataTypes.STRING
      },
      {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
      
        // define the table's name
        tableName: 'city'
      }  
    );
    
    return City;

};