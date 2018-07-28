/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var globals    = require('../models/global.js');
var persistence;
var DataBase   = require('../models/database.js');
var dataBase   = new DataBase();

function HistoricalPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/historical.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                          var Persistence = require('./firebase/historical.js');          
                          var persistence = new Persistence();
                          resolve(persistence);
                  }
                   else {
                       reject();
                   }
        }); // fim return new Promise(function (resolve, reject) {
    }; // fim function (initials) {

    this.getPersistence()
        .then((data) => {
            persistence = data;
        });


    // get all objects data 
    this.getAll = function (res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getAll(db, res);
        });
    
    }; // fim this.getAll

    // get object by id
    this.getById = function (id, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getById(db, id, res);
        });
    }; // fim this.getById


    // get object by status
    this.getByStatus = function (status, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByStatus(db, status, res);
        });
    }; // fim this.getByStatus


    this.add = function (object, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.add(db, object, res);
        });
    }; // fim this.add


    this.deleteById = function (id, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.deleteById(db, id, res);
        });
    }; // fim this.deleteById

}

module.exports = HistoricalPersistence;
