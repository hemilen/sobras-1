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

function UserPersistence() {

    this.getPersistence = 
    function () {    
          return new Promise(function (resolve, reject) {
              if   (globals.dataBaseType == 1) {
                    var Persistence = require('./relational/user.js');
                    var persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                          var Persistence = require('./firebase/user.js');          
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

    // get object by email
    this.getByEmail = function (email, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByEmail(db, email, res);
        });
    }; // fim this.getByEmail


    // get object by birthDate
    this.getByBirthDate = function (birthDate, res) {
        dataBase.getDataBase(globals.dataBaseType)
        .then((db) => {
            persistence.getByBirthDate(db, birthDate, res);
        });
    }; // fim this.getByBirthDate


    // get quantity object by email
    this.getQttByEmail = function (email, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                //resolve
                (db) => {    
                    persistence.getQttByEmail(db, email, res)
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
        });// fim do promise
    }; // fim this.getQttByEmail


    // verify is object by email exists
    this.isEmailInUse = function (email, res) {
        return new Promise((resolve, reject) => {
            dataBase.getDataBase(globals.dataBaseType)
            .then(
                // resolve
                (db) => {
                    persistence.isEmailInUse(db, email, res)
                    .then(
                        // resolve
                        (data)  => {
                            resolve(data)
                        },// fim do resolve
                        // reject
                        function ( erro ) {
                            reject (erro);
                        } // fim do reject do isNameInUse
                    )// fim do then
                }// fim do resolve
            );// fim do then getDataBase 
        });// fim do promise
    }; // fim this.isEmailInUse


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

module.exports = UserPersistence;
