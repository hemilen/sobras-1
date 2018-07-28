/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var Error        = require('../../entity/error.js');

function DonationPersistenceSequelize() {

    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        db.donation
            .findAll({
                attributes: { exclude: ['productId','userId','cityId'] },
                include: [
                    {
                        model: db.product
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.city,
                        include: [
                            {
                                model: db.state,
                                include: [
                                    {
                                        model: db.region
                                    }
                                ]
                            }
                        ]
                    }
                ],

                // Add order conditions here....
                order: [
                    ['status', 'ASC']
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            }); // fim .then(object => {
    }; // fim this.getAll

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.donation
            //.findById(id)
            .findAll({
                where: { id: id },
                attributes: { exclude: ['productId','userId','cityId'] },
                include: [
                    {
                        model: db.product
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.city,
                        include: [
                            {
                                model: db.state,
                                include: [
                                    {
                                        model: db.region
                                    }
                                ]
                            }
                        ]
                    }
                ],
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getById

    // get object by user
    this.getByUser = function (db, userId, res) {
        // get userId as parameter to passing into query and return filter data
        db.donation
            .findAll({
                where: {
                    userId: userId
                },
                attributes: { exclude: ['productId','userId','cityId'] },
                include: [
                    {
                        model: db.product
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.city,
                        include: [
                            {
                                model: db.state,
                                include: [
                                    {
                                        model: db.region
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByUser

    // get object by status
    this.getByStatus = function (db, status, res) {
        // get status as parameter to passing into query and return filter data
        db.donation
            .findAll({
                where: {
                    status: status
                },
                attributes: { exclude: ['productId','userId','cityId'] },
                include: [
                    {
                        model: db.product
                    },
                    {
                        model: db.user,
                        attributes: { exclude: ['password'] }
                    },
                    {
                        model: db.city,
                        include: [
                            {
                                model: db.state,
                                include: [
                                    {
                                        model: db.region
                                    }
                                ]
                            }
                        ]
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByStatus


    // get status object by id
    this.getStatus = function (db, id, res) {
        return new Promise((resolve, reject) => {
            db.donation
                .findById(id)
                .then(
                    (result) => {
                        if (result) {
                            resolve(result.status);    
                        }
                        else {
                            resolve(0);
                        }
                    }
                 ) // fim do then
                 .catch(
                     function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar status da doação por id',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                   }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttStatus


    // get quantity object by id
    this.getQttById = function (db, id, res) {
        return new Promise((resolve, reject) => {
            db.donation
                .count({ where: { id: id } })
                .then(
                    (qtt) => {
                        resolve(qtt);
                    }
                 ) // fim do then
                 .catch(
                     function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar doação por id',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                   }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttById


    // get quantity object by status
    this.getQttByStatus = function (db, status, res) {
        return new Promise((resolve, reject) => {
            db.donation
                .count({ where: { status: status } })
                .then(
                    (qtt) => {
                        //res.json({ qtde: qtt });
                        resolve(qtt);
                    }
                )// fim do then
                .catch( 
                    function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar doação por status',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                   }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByStatus()


    // verify is object by id exists
    this.exists = function (db, id, res) {
        return new Promise((resolve, reject) => {
            var exists = false;

            this.getQttById(db, id, res)
            .then(
                // resolve
                (qtt) => {
                    if   (qtt == 0)
                         exists = false;
                    else exists = true;

                    resolve(exists);
                }, // fim do resolve getQttByName
                // reject
                function ( erro ) {
                    reject (erro);
                }// fim do reject getQttByName
            ); // fim do then getQttByName
        });   // Closing of Promise block
    }; // fim this.isNameInUse

    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.donation
            .create(object)
            .then(function (addedRecord) {
                var params = {
                    // Retornei o id inserido no code 
                    //code:     200,
                    code:     addedRecord.dataValues.id,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };

                var error = new Error(params);
                res.json(error);
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir doação',
                    response: err
                };

                var error = new Error(params);
                res.json(error);
            });
    }; // fim this.add


    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.donation
            .update(object, {
                where: {
                    id: object.id
                }
            })
            .then(function (updatedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully updated.'
                };

                var error = new Error(params);
                res.json(error);
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao alterar doação',
                    response: err
                };

                var error = new Error(params);
                res.json(error);
            });
    }; // fim this.update


    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.donation
            .destroy({
                where: {
                    id: id
                }
            })
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    code     = 200;
                    message  = 'OK';
                    response = 'Record is successfully deleted.';
                }
                else {
                    code     = 404;
                    message  = 'OK';
                    response = 'Record not found.';
                }
                var params = {
                    code:     code,
                    message:  message,
                    response: response
                };

                var error = new Error(params);
                res.json(error);
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao excluir',
                    response: err
                };

                var error = new Error(params);
                res.json(error);
            });

    }; // fim this.deleteById

}

module.exports = DonationPersistenceSequelize;
