/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var Error        = require('../../entity/error.js');

function ProductPersistenceSequelize() {
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        db.product
            .findAll({
                /*
                include: [
                    {
                        model: db.state,
                        include: [
                            {
                                model: db.city
                            }
                        ]
                    }
                ],
                */

                // Add order conditions here....
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(object => {
                /*
                //Pode ser feito dessa forma também
                const resObj = this.getObject(object);
                res.json(resObj);
                */

                //return object;

                res.send(JSON.parse(JSON.stringify(object)));
            }); // fim .then(object => {
    }; // fim this.getAll

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.product
            //.findById(id)
            .findAll({
                where: { id: id }
                /*
                include: [
                    {
                        model: db.state,
                        include: [
                            {
                                model: db.city
                            }
                        ]
                    }
                ]
                */
            })
            .then(object => {
                /*
                // Pode ser feito dessa forma também
                const resObj = this.getObject(object);
                res.json(resObj);
                */

                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getById

    // get object by name
    this.getByName = function (db, name, res) {
        // get id as parameter to passing into query and return filter data
        db.product
            .findAll({
                where: {
                    name: name
                }
                /*
                include: [
                    {
                        model: db.state,
                        include: [
                            {
                                model: db.city
                            }
                        ]
                    }
                ]
                */
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByName


    // get quantity object by name
    this.getQttByName = function (db, name, res) {
        return new Promise((resolve, reject) => {
            db.product
                .count({ where: { name: name } })
                .then(qtt => {
                    //res.json({ qtde: qtt });
                    resolve(qtt);
                })
                .catch(
                    function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar produto por nome',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                    }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByName


    // verify is object by name exists
    this.isNameInUse = function (db, name, res) {
        return new Promise((resolve, reject) => {
            var isNameInUse = false;

            this.getQttByName(db, name, res)
            .then(
                // resolve
                (qtt) => {
                    if   (qtt == 0)
                         isNameInUse = false;
                    else isNameInUse = true;

                    resolve(isNameInUse);
                }, // fim do resolve
                // reject
                function ( erro ) {
                    reject(erro);
                }// fim do reject
            );// fim do then
        });   // Closing of Promise block
    }; // fim this.isNameInUse


    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.product
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
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir produto',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // fim this.add


    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.product
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
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao alterar produto',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // fim this.update


    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.product
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
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao excluir',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });

    }; // fim this.deleteById

}

module.exports = ProductPersistenceSequelize;
