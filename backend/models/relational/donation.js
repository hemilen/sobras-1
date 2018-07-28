/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
*/

'use strict'

module.exports = (sequelize, DataTypes) => {  
  
    const Donation = sequelize.pool.define('donation', {
          qtt:         DataTypes.DOUBLE,
          date:        DataTypes.DATE,
          status:      DataTypes.INTEGER,
          description: DataTypes.TEXT,

          // Set FK relationship (hasMany) with `Product`
          productId: {
            type: DataTypes.INTEGER,
            references: "product",
            referencesKey: "id"
          },

          // Set FK relationship (hasMany) with `User`
          userId: {
            type: DataTypes.INTEGER,
            references: "user",
            referencesKey: "id"
          },

          // Set FK relationship (hasMany) with `City`
          cityId: {
            type: DataTypes.INTEGER,
            references: "city",
            referencesKey: "id"
          }          
      },
      {
        // disable the modification of tablenames; By default, sequelize will automatically
        // transform all passed model names (first parameter of define) into plural.
        // if you don't want that, set the following
        freezeTableName: true,
      
        // define the table's name
        tableName: 'donation'
      }  
    );

    return Donation;

};