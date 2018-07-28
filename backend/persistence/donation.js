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

function DonationPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/donation.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                          var Persistence = require('./firebase/donation.js');          
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
        .then(
            (db) => {
                persistence.getById(db, id, res);
            }
        );
    }; // fim this.getById

    // get object by name
    this.getByUser = function (userId, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByUser(db, userId, res);
        });
    }; // fim this.getByUser


    // get object by status
    this.getByStatus = function (status, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByStatus(db, status, res);
        });
    }; // fim this.getByStatus


    // get object status by id
    this.getStatus = function (id, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {    
                    persistence.getStatus(db, id, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        }, // fim do resolve getStatus
                        // rejecct
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject getStatus
                    ); // fim do then getStatus
                }// fim do resolve getDataBase
            ); // fim do then getDataBase
        });// fim do promise
    }; // fim this.getStatus


    // get quantity object by id
    this.getQttById = function (id, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {    
                    persistence.getQttByName(db, id, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        }, // fim do resolve getQttById 
                        // rejecct
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject getQttById
                    ); // fim do then getQttById
                }// fim do resolve getDataBase
            ); // fim do then getDataBase
        });// fim do promise
    }; // fim this.getQttById


    // get quantity object by status
    this.getQttByStatus = function (status, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                //resolve
                (db) => {    
                    persistence.getQttByStatus(db, status, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        },// fim do resolve
                        // rejecct
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject getQttByName
                    );// fim do then
                }// fim do resolve getDataBase
            );// fim do then getDataBase
        }); // fim do promise
    }; // fim this.getQttByStatus


    // verify is object by id exists
    this.exists = function (id, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {
                    persistence.exists(db, id, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        }, // fim do resolve do exists
                        // reject
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject do exists
                    ); // fim do then do exists
                }// fim do resolve do getDataBase
            ); // fim do then do getDataBase
        });// fim do promise
    }; // fim this.exists


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

module.exports = DonationPersistence;
