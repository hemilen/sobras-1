/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var Error        = require('../../entity/error.js');

function HistoricalPersistenceSequelize() {

    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        db.historical
            .findAll({
                attributes: { exclude: ['donationId'] },
                include: [
                    {
                        model: db.donation,
                        include: [
                            {
                                model: db.product
                            }
                        ]
                    }
                ],

                // Add order conditions here....
                order: [
                    ['date', 'ASC']
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            }); // fim .then(object => {
    }; // fim this.getAll

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.historical
            //.findById(id)
            .findAll({
                where: { id: id },
                attributes: { exclude: ['donationId'] },
                include: [
                    {
                        model: db.donation,
                        include: [
                            {
                                model: db.product
                            }
                        ]
                    }
                ],

                // Add order conditions here....
                order: [
                    ['date', 'ASC']
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getById

    // get object by status
    this.getByStatus = function (db, status, res) {
        // get status as parameter to passing into query and return filter data
        db.historical
            .findAll({
                where: {
                    status: status
                },
                attributes: { exclude: ['donationId'] },
                include: [
                    {
                        model: db.donation,
                        include: [
                            {
                                model: db.product
                            }
                        ]
                    }
                ],

                // Add order conditions here....
                order: [
                    ['date', 'ASC']
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByStatus


    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.historical
            .create(object)
            .then(function (addedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };

                var error = new Error(params);
                // se eu liberar, dá erro porque essa função é chamada depois de fazer
                // o update em donation. Não sei qual a forma correta.
                //res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir histórico',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // fim this.add


    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.historical
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

module.exports = HistoricalPersistenceSequelize;
