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

function CityPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/city.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                          var Persistence = require('./firebase/city.js');          
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


    // get object by state
    this.getByState = function (stateId, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByState(db, stateId, res);
        });
    }; // fim this.getByState


    // get quantity object by name
    this.getQttByName = function (name, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(//resolve
                (db) => {    
                    persistence.getQttByName(db, name, res)
                    .then(
                        //resolve
                        (data)  => {
                            resolve(data)
                        },
                        // rejecct
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject getQttByName
                    );// fim do then getQttByName
                }// fim do resolve getDataBase
            );// fim do then
        });// fim do promise
    }; // fim this.getQttByName


    // get quantity object by state
    this.getQttByState = function (stateId, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {    
                    persistence.getQttByInitials(db, stateId, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        },// fim do resolve getQttByInitials
                        function ( erro ) {
                            reject ({erro});
                        } // fim do resolve getQttByInitials
                    );// fim do then getQttByInitials
                }// fim do resolve getDataBase
            );// fim do then getDataBase
        });// fim do promise
    }; // fim this.getQttByState


    // verify is object by name exists
    this.isNameInUse = function (name, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {
                    persistence.isNameInUse(db, name, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        },// fim do resolve do isNameInUse
                        // reject
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject do isNameInUse
                    )// fim do then do isNameInUse
                }// fim do resolve do getDataBase
            );// fim do then do getDataBase
        });// fim do promise
    }; // fim this.isNameInUse


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

module.exports = CityPersistence;
