/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

var validator    = new (require('./validators/state.js'))()
var State        = require('../entity/state.js');
var Region       = require('../entity/region.js');

function StateController() {
    var Persistence  = require('../persistence/state.js');
    var persistence  = new Persistence();
    
    // get all objects data 
    this.getAll = function (res) {
        persistence.getAll(res);
    };

    // get object by id 
    this.getById = function (req, res) {
        persistence.getById(req.params.id, res);
    };

    // get object by name 
    this.getByName = function (req, res) {
        persistence.getByName(req.params.name, res);
    };

    // get object by initials 
    this.getByInitials = function (req, res) {
        persistence.getByInitials(req.params.initials, res);
    };

    // get quantity of objects by name 
    this.getQttByName = function (req, res) {
        persistence.getQttByName(req.params.name)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de estados com o nome " + req.params.name + ": " + qtt);
        });
    };

    // get quantity of objects by initials 
    this.getQttByInitials = function (req, res) {
        persistence.getQttByInitials(req.params.initials, res)
        .then((qtt) => {
          console.log("Qtde de estados com a sigla " + req.params.initials + ": " + qtt);
        });
    };

    // get name of object in use 
    this.isNameInUse = function (name, res) {
        persistence.isNameInUse(name, res)
        .then((isNameInUse) => {
          console.log("Nome do estado está em uso? " + isNameInUse);
        });
    };

    // get initials of object in use 
    this.isInitialsInUse = function (initials, res) {
        persistence.isInitialsInUse(initials, res)
        .then((isInitialsInUse) => {
          console.log("Sigla do estado está em uso? " + isInitialsInUse);
        });
    };

    // add one object
    this.add = function (req, res) {
        var allErrors = [];

        Promise.all([
            new Promise((resolve, reject)=>{
                var errors  = validator.checkBody(req, res);
               
                if(errors.length > 0){
                    allErrors.push(errors);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                persistence.isNameInUse(req.body.name, res)
                .then(
                    // resolve
                    (data) => {
                        if (data) {
                            error  = {  location: 'body', 
                                        param:    'name', 
                                        msg:      'Nome já está em uso', 
                                        value:     req.body.name
                                    };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve isNameInUse
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject isNameInUse
                ); // fim do then isNameInUse
            }),

            new Promise((resolve, reject)=>{
                persistence.isInitialsInUse(req.body.initials, res)
                .then(
                    // resolve
                    (data) => {
                        if (data) {
                            error  = {  location: 'body', 
                                        param:    'initials', 
                                        msg:      'Sigla já está em uso', 
                                        value:     req.body.initials 
                                    };
    
                            allErrors.push(error);
                            resolve();
                        }
                        else resolve();
                    }, // fim do resolve isInitialsInUse
                    // reject
                    function (erro){
                        reject(erro);
                    }// fim do resolve isInitialsInUse
                );// fim do then isInitialsInUse
            })
          ]).then(result=>{
                if (allErrors.length > 0){
                    res.status(400).send(allErrors);
                } 
                else {
                    console.info('Ok ', allErrors);
                    var stateParams = {
                        id:       '',
                        name:     req.body.name,
                        initials: req.body.initials,
                        regionId: req.body.region
                    }

                    var state = new State(stateParams);

                    persistence.add(state, res);
                }

          }).catch(reason=>{
                console.warn('Failed!', reason, ' ', allErrors);
                res.status(400).send(allErrors);
        });
    };// fim do add

    // update one object 
    this.update = function (req, res) {
        // Usando o exemplo do Leonardo
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
                var stateParams = {
                    id:       req.body.id,
                    name:     req.body.name,
                    initials: req.body.initials,
                    regionId: req.body.region.id
                }
                
                var state = new State(stateParams);

                persistence.update(state, res);
        }
    };

    // delete one object 
    this.deleteById = function (id, res) {
        persistence.deleteById(id, res);
    };

}

module.exports = StateController;