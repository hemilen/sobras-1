/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/
var validator    = new (require('./validators/donation.js'))()
var Donation     = require('../entity/donation.js');
var Historical   = require('../entity/historical.js');

function DonationController() {
    var Persistence           = require('../persistence/donation.js');
    var persistence           = new Persistence();

    var PersistenceProduct    = require('../persistence/product.js');
    var persistenceProduct    = new PersistenceProduct();

    var PersistenceUser       = require('../persistence/user.js');
    var persistenceUser       = new PersistenceUser();
    
    var PersistenceCity       = require('../persistence/city.js');
    var persistenceCity       = new PersistenceCity();
    
    var PersistenceHistorical = require('../persistence/historical.js');
    var persistenceHistorical = new PersistenceHistorical();

    // get all objects data 
    this.getAll = function (res) {
        persistence.getAll(res);
    };

    // get object by id 
    this.getById = function (req, res) {
        persistence.getById(req.params.id, res);
    };

    // get object by name 
    this.getByUser = function (req, res) {
        persistence.getByUser(req.params.userId, res);
    };

    // get object by status 
    this.getByStatus = function (req, res) {
        persistence.getByStatus(req.params.status, res);
    };

    // get object status by id
    this.getStatus = function (req, res) {
        persistence.getStatus(req.params.id)
        .then((status) => {
            res.json({ status: status });
            console.log("Status da doação com o id " + req.params.id + ": " + status);
        });
    };

    // get quantity of objects by id
    this.getQttById = function (req, res) {
        persistence.getQttById(req.params.id)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de doações com o id " + req.params.id + ": " + qtt);
        });
    };

    // get quantity of objects by status 
    this.getQttByStatus = function (req, res) {
        persistence.getQttByStatus(req.params.status)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de doações com o status " + req.params.status + ": " + qtt);
        });
    };

    // get oject exists by id 
    this.exists = function (id, res) {
        persistence.exists(id, res)
        .then((exists) => {
          console.log("Doação existe? " + exists);
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
                persistenceProduct.getById(req.body.product.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'product.id', 
                                        msg:      'Produto não encontrado', 
                                        value:     req.body.product.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            }),

            new Promise((resolve, reject)=>{
                persistenceUser.getById(req.body.user.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'user.id', 
                                        msg:      'Usuário não encontrado', 
                                        value:     req.body.user.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            }),

            new Promise((resolve, reject)=>{
                persistenceCity.getById(req.body.city.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'city.id', 
                                        msg:      'Cidade não encontrada', 
                                        value:     req.body.city.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            })
        ])
        .then(result=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                    console.info('Ok ', allErrors);
                    var params = {
                        qtt:         req.body.qtt,
                        date:        new Date(),
                        status:      1, // pendente
                        description: req.body.description,
                        productId:   req.body.product.id,
                        userId:      req.body.user.id,
                        cityId:      req.body.city.id
                    }

                    var donation = new Donation(params);

                    persistence.add(donation, res);

                    var params = {
                        date:        donation.date,
                        status:      donation.status, // 1 - pendente
                        donationId:  donation.id
                    }

                    var historical = new Historical(params);
                    persistenceHistorical.add(historical, res);
            }

        }) // fim do then
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        }); // fim do catch

    }; // fim this.add = function (req, res) {


    // update one object 
    this.update = function (req, res) {
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
                persistenceProduct.getById(req.body.product.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'product.id', 
                                        msg:      'Produto não encontrado', 
                                        value:     req.body.product.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            }),

            new Promise((resolve, reject)=>{
                persistenceUser.getById(req.body.user.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'user.id', 
                                        msg:      'Usuário não encontrado', 
                                        value:     req.body.user.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            }),

            new Promise((resolve, reject)=>{
                persistenceCity.getById(req.body.city.id)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'city.id', 
                                        msg:      'Cidade não encontrada', 
                                        value:     req.body.city.id 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    },// fim do resolve
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject
                );// fim do then
            })
        ])
        .then(result=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                    console.info('Ok ', allErrors);
                    var params = {
                        qtt:         req.body.qtt,
                        description: req.body.description,
                        productId:   req.body.product.id, 
                        userId:      req.body.user.id,
                        cityId:      req.body.city.id,
                        id:          req.body.id
                    }
        
                    var donation = new Donation(params);

                    persistence.add(donation, res);

                    var params = {
                        date:        donation.date,
                        status:      donation.status, // 1 - pendente
                        donationId:  donation.id
                    }

                    var historical = new Historical(params);
                    persistenceHistorical.add(historical, res);
            }

        }) // fim do then
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        }); // fim do catch

    }; // fim this.update = function (req, res) {


    /*
    // NÃO CONSEGUI fazer assim
    this.validateUpdateStatus = function (req, res) {
        var allErrors = [];

        Promise.all([
            new Promise((resolve, reject)=>{

                if(!req.body){
                    error  = {  location: 'body', 
                                param:    'body', 
                                msg:      'Body must not be null', 
                                value:     req.body
                            };
                    allErrors.push(error);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                if(req.body.id == 0){
                    error  = {  location: 'body', 
                                param:    'id', 
                                msg:      'Doação não informada.', 
                                value:     req.body.id 
                            };
                    allErrors.push(error);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                persistence.exists(req.body.id, res)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'id', 
                                        msg:      'Doação não encontrada', 
                                        value:     req.body.id
                                    };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve 
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject 
                ); // fim do then 
            }), 

            // Validar da seguinte forma:
            // so pode doar se status = 1 (pendente)
            new Promise((resolve, reject)=>{
                persistence.getStatus(req.body.id, res)
                .then(
                    // resolve
                    (data) => {
                        if (data != 1) {
                            error  = {  location: 'body', 
                                        param:    'status', 
                                        msg:      'Doação não permitida. Status da doação deve estar pendente.', 
                                        value:     data 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve 
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject 
                ); // fim do then 
            })
        ])
        .then(result=>{
            console.log("EEEE ", allErrors);
            resolve(allErrors);
        }) // fim do then
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            //res.status(400).send(reason); //allErrors);
            reject(reason);
        }); // fim do catch
    }// fim validateUpdateStatus
    */

    
    // update one object 
    this.donate = function (req, res) {
        var allErrors = [];

        Promise.all([
            new Promise((resolve, reject)=>{

                if(!req.body){
                    error  = {  location: 'body', 
                                param:    'body', 
                                msg:      'Body must not be null', 
                                value:     req.body
                            };
                    allErrors.push(error);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                if(req.body.id == 0){
                    error  = {  location: 'body', 
                                param:    'id', 
                                msg:      'Doação não informada.', 
                                value:     req.body.id 
                            };
                    allErrors.push(error);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                persistence.exists(req.body.id, res)
                .then(
                    // resolve
                    (data) => {
                        if (!data) {
                            error  = {  location: 'body', 
                                        param:    'id', 
                                        msg:      'Doação não encontrada', 
                                        value:     req.body.id
                                    };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve 
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject 
                ); // fim do then 
            }), 

            // Validar da seguinte forma:
            // so pode doar se status = 1 (pendente)
            new Promise((resolve, reject)=>{
                persistence.getStatus(req.body.id, res)
                .then(
                    // resolve
                    (data) => {
                        if (data != 1) {
                            error  = {  location: 'body', 
                                        param:    'status', 
                                        msg:      'Doação não permitida. Status da doação deve estar pendente.', 
                                        value:     data 
                            };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve 
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject 
                ); // fim do then 
            })
        ])
        .then(result=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                    console.info('Ok ', allErrors);
                    var params = {
                        status:  2, // doado
                        id:      req.body.id
                    }
        
                    var donation = new Donation(params);        
                    persistence.update(donation, res);
        
                    var params = {
                        date:        new Date(),
                        status:      donation.status, // 1 - pendente
                        donationId:  donation.id
                    }

                    var historical = new Historical(params);
                    persistenceHistorical.add(historical, res);
            }

        }) // fim do then
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        }); // fim do catch
    }; // fim this.donate = function (req, res) {

    
    // update one object 
    this.cancel = function (req, res) {
        // Validar da seguinte forma:
        // so pode cancelar se status = 2 (doado)
        // Usando o exemplo do Leonardo
        /*
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            */
            var params = {
                status:  1,
                id:      req.body.id
            }

            var donation = new Donation(params);

            persistence.update(donation, res);
        //}
    }; // fim this.cancel = function (req, res) {

    
    // update one object 
    this.giveUp = function (req, res) {
        // Validar da seguinte forma:
        // so pode desistir se status = 1 (pendente)
        // Usando o exemplo do Leonardo
        /*
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            */
            var params = {
                status:  3, // desistido
                id:      req.body.id
            }

            var donation = new Donation(params);

            persistence.update(donation, res);
        //}
    }; // fim this.giveup = function (req, res) {

    
    // update one object 
    this.undoGiveUp = function (req, res) {
        // Validar da seguinte forma:
        // so pode desfazer a desistência se status = 3 (pendente)
        // Usando o exemplo do Leonardo
        /*
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            */
            var params = {
                status:  1, // pendente
                id:      req.body.id
            }

            var donation = new Donation(params);

            persistence.update(donation, res);
        //}
    }; // fim this.undoGiveup = function (req, res) {

    
    // update one object 
    this.delivery = function (req, res) {
        // Validar da seguinte forma:
        // so pode entregar se status = 2 (doado)
        // Usando o exemplo do Leonardo
        /*
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            */
            var params = {
                status:  4, // entregue
                id:      req.body.id
            }

            var donation = new Donation(params);

            persistence.update(donation, res);
        //}
    }; // fim this.delivery = function (req, res) {

    
    // update one object 
    this.cancelDelivery = function (req, res) {
        // Validar da seguinte forma:
        // so pode cancelar a entrega se status = 4 (entregue)
        // Usando o exemplo do Leonardo
        /*
        var errors = validator.checkBody(req);

        if(errors.length > 0){
            res.status(400).send(errors);
        } 
        else {
            */
            var params = {
                status:  2, // doado
                id:      req.body.id
            }

            var donation = new Donation(params);

            persistence.update(donation, res);
        //}
    }; // fim this.cancelDelivery = function (req, res) {


    // delete one object 
    this.deleteById = function (id, res) {
        // fazer a validação aqui
        persistence.deleteById(id, res);
    }; // fim this.deleteById = function (id, res) {

}

module.exports = DonationController;
