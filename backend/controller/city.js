/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

var validator    = new (require('./validators/city.js'))()
var City         = require('../entity/city.js');
var State        = require('../entity/state.js');

function CityController() {
    var Persistence  = require('../persistence/city.js');
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

    // get object by state
    this.getByState = function (req, res) {
        persistence.getByState(req.params.state.id, res);
    };

    // get quantity of objects by name 
    this.getQttByName = function (req, res) {
        persistence.getQttByName(req.params.name)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de cidades com o nome " + req.params.name + ": " + qtt);
        });
    };

    // get quantity of objects by state 
    this.getQttByState = function (req, res) {
        persistence.getQttByState(req.params.state.id, res)
        .then((qtt) => {
          console.log("Qtde de cidades os o estado " + req.params.state.name + ": " + qtt);
        });
    };

    // get name of object in use 
    this.isNameInUse = function (name, res) {
        persistence.isNameInUse(name, res)
        .then((isNameInUse) => {
          console.log("Nome da cidade está em uso? " + isNameInUse);
        });
    };


    // add one object
    this.add = function (req, res) {
        // ************************************************
        // Ver uma forma de juntar os dois erros
        // ************************************************
        var errors  = validator.checkBody(req, res);        

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
                /*
                // TEM que CORRIGIR
                this.validateAdd(req.body.name, req.body.initials, res)
                .then((data) => {
                    if(data.length > 0){
                        res.status(400).send(data);
                    } 
                    else {*/            
                        var cityParams = {
                            id:       '',
                            name:     req.body.name,
                            stateId:  req.body.state
                        }

                        var city = new City(cityParams);

                        persistence.add(city, res);
                    //}
                //});
            }

    };

    // update one object 
    this.update = function (req, res) {
        // Usando o exemplo do Leonardo
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
                var cityParams = {
                    id:       req.body.id,
                    name:     req.body.name,
                    stateId:  req.body.state.id
                }
                
                var city = new City(cityParams);

                persistence.update(city, res);
        }
    };

    // delete one object 
    this.deleteById = function (id, res) {
        persistence.deleteById(id, res);
    };

}

module.exports = CityController;