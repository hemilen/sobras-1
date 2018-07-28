/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/
var validator    = new (require('./validators/product.js'))()
var Product      = require('../entity/product.js');

function ProductController() {
    var Persistence  = require('../persistence/product.js');
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


    // get quantity of objects by name 
    this.getQttByName = function (req, res) {
        persistence.getQttByName(req.params.name)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de produtos com o nome " + req.params.name + ": " + qtt);
        });
    };


    // get name of object in use 
    this.isNameInUse = function (name, res) {
        persistence.isNameInUse(name, res)
        .then((isNameInUse) => {
          console.log("Nome do produto está em uso? " + isNameInUse);
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
            })
          ]).then(result=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                console.info('Ok ', allErrors);
                var name = req.body.name;

                var params = {
                                name: name
                             }

                var product = new Product(params);

                persistence.add(product, res);
}

          }).catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        });

    }; // fim this.add = function (req, res) {

    // update one object 
    this.update = function (req, res) {
        // Usando o exemplo do Leonardo
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            var name = req.body.name;
            var initials = req.body.initials;
            var id = req.body.id;

            var params = {
                name: name,
                id: id
            }

            var product = new Product(params);

            persistence.update(product, res);
        }
    };

    // delete one object 
    this.deleteById = function (id, res) {
        // fazer a validação aqui
        persistence.deleteById(id, res);
    };

}

module.exports = ProductController;
