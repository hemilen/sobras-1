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

function StatePersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/state.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                          var Persistence = require('./firebase/state.js');          
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

    // get object by name
    this.getByName = function (name, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByName(db, name, res);
        });
    }; // fim this.getByName


    // get object by initials
    this.getByInitials = function (initials, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByInitials(db, initials, res);
        });
    }; // fim this.getByInitials


    // get quantity object by name
    this.getQttByName = function (name, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.getQttByName(db, name, res)
                .then((data)  => {resolve(data)});
            });
        });
    }; // fim this.getQttByName


    // get quantity object by initiais
    this.getQttByInitials = function (initials, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.getQttByInitials(db, initials, res)
                .then((data)  => {resolve(data)});
            });
        });
    }; // fim this.getQttByInitials


    // verify is object by name exists
    this.isNameInUse = function (name, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {
                persistence.isNameInUse(db, name, res)
                .then((data)  => {
                    resolve(data)
                })
                .catch( function ( erro ) {
                    reject(new Error("Nome em uso " + erro));
                });
            });
        });
    }; // fim this.isNameInUse


    // verify is object by initials exists
    this.isInitialsInUse = function (initials, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.isInitialsInUse(db, initials, res)
                .then((data)  => {resolve(data)})
                .catch( function ( erro ) {
                    reject(new Error("Sigla em uso " + erro));
                });
            });
        });
    }; // fim this.isInitialsInUse


    this.add = function (object, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.add(db, object, res);
        });
    }; // fim this.add


    this.update = function (object, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.update(db, object, res);
        });
    }; // fim this.update


    this.deleteById = function (id, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {    
            persistence.deleteById(db, id, res);
        });
    }; // fim this.deleteById

}

module.exports = StatePersistence;
