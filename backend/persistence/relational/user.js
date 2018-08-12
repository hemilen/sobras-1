/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var Error = require('../../entity/error.js');
var Resposta = require('../../entity/resposta.js');

var params = {
    status: "ok",
    code: 200,
    messages: [],
    result: {}
};

var params = new Resposta(params);

function UserPersistenceSequelize() {

    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        db.user
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
                attributes: { exclude: ['password'] },

                // Add order conditions here....
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(object => {
                params.messages = [{
                    msg: "Sucesso na busca"
                }];
                params.result = { users: object };
                res.send(params);
            }); // fim .then(object => {
    }; // fim this.getAll

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.user
            //.findById(id)
            .findAll({
                where: { id: id },
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
                attributes: { exclude: ['password'] }
            })
            .then(object => {
                params.messages = [{
                    msg: "Sucesso na busca"
                }];
                params.result = { user: object[0] };
                // params.result = object;
                res.send(params);
            }).catch(() => {
                params.status = "not found";
                params.code = 404;
                params.messages = [];
                params.result = {};
                res.status(404).send(params);
            });
    }; // fim this.getById

    // get object by email
    this.getByEmail = function (db, email, res) {
        // get id as parameter to passing into query and return filter data
        db.user
            .findAll({
                where: {
                    email: email
                },
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
                attributes: { exclude: ['password'] }
            })
            .then(object => {
                params.messages = [{
                    msg: "Sucesso na busca"
                }];
                params.result = { user: object[0] };
                res.send(params);
            });
    }; // fim this.getByEmail


    // get object by birthDate
    this.getByBirthDate = function (db, birthDate, res) {
        // get id as parameter to passing into query and return filter data
        db.user
            .findAll({
                where: {
                    birthDate: birthDate
                },
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
                params.messages = [{
                    msg: "Sucesso na busca"
                }];
                params.result = { user: object };
                res.send(params);
            });
    }; // fim this.getByBirthDate


    // get quantity object by email
    this.getQttByEmail = function (db, email, res) {
        return new Promise((resolve, reject) => {
            db.user
                .count({ where: { email: email } })
                .then(
                    (qtt) => {
                        //res.json({ qtde: qtt });
                        resolve(qtt);
                    }
                )// fim do then
                .catch(
                    function (erro) {
                        var params = {
                            code: 500,
                            message: 'Erro ao buscar usuário por email',
                            response: erro
                        };

                        var error = new Error(params);
                        reject(new Error(error));
                    }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByEmail


    // get quantity object by birthDate
    this.getQttByBirthDate = function (db, birthDate, res) {
        return new Promise((resolve, reject) => {
            db.user
                .count({ where: { birthDate: birthDate } })
                .then(
                    (qtt) => {
                        //res.json({ qtde: qtt });
                        resolve(qtt);
                    }
                )// fim do then
                .catch(
                    function (erro) {
                        var params = {
                            code: 500,
                            message: 'Erro ao buscar qtde de usuário por data de nascimento',
                            response: erro
                        };

                        var error = new Error(params);
                        reject(new Error(error));
                    }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByBirthDate


    // verify is object by email exists
    this.isEmailInUse = function (db, email, res) {
        return new Promise((resolve, reject) => {
            var isEmailInUse = false;

            this.getQttByEmail(db, email, res)
                .then(
                    //resolve
                    (qtt) => {
                        if (qtt == 0)
                            isEmailInUse = false;
                        else isEmailInUse = true;

                        resolve(isEmailInUse);
                    }, // fim do resolve getQttByEmail
                    // reject
                    function (erro) {
                        reject(erro);
                    }// fim do reject getQttByEmail
                )// fim do then
        });   // Closing of Promise block
    }; // fim this.isEmailInUse


    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.user
            .create(object)
            .then(function (addedRecord) {
                params = {
                    status: "created",
                    code: 201,
                    messages: [{
                        msg: "Adicionado com sucesso"
                    }],
                    result: {
                        user: addedRecord.dataValues
                    }
                };

                res.send(new Resposta(params));

            })
            .catch(function (err) {
                params = {
                    status: "internal server error",
                    code: 500,
                    messages: [{
                        msg: "Erro interno"
                    }, {
                        msg: err.toString()
                    }],
                    result: {}
                };

                res.status(500).send(new Resposta(params));

            });
    }; // fim this.add


    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.user
            .update(object, {
                returning: true,
                where: {
                    id: object.id
                },
                validate: true,
            })
            .then(updatedBook => {
                params = {
                    status: "ok",
                    code: 200,
                    messages: [{
                        msg: "Alterado com sucesso"
                    }],
                    result: {
                        user: updatedBook
                    }
                };

                res.send(new Resposta(params));
            })
            .catch(function (err) {
                params = {
                    status: "internal server error",
                    code: 500,
                    messages: [{
                        msg: "Erro interno"
                    }, {
                        msg: err.toString()
                    }],
                    result: {}
                };

                res.status(500).send(new Resposta(params));
            });
    }; // fim this.update


    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.user
            .destroy({
                where: {
                    id: id
                }
            })
            .then(function (deletedRecord) {
                

                if (deletedRecord === 1) {
                    params = {
                        status: "ok",
                        code: 200,
                        messages: [{
                            msg: "Deletado com sucesso"
                        }],
                        result: {}
                    };
                }
                else {
                    params = {
                        status: "not found",
                        code: 404,
                        messages: [{
                            msg: "Erro de deletar, verifique id"
                        }],
                        result: {}
                    };
                }

                res.send(new Resposta(params));

            })
            .catch(function (err) {
                var params = {
                    code: 500,
                    message: 'Erro ao excluir',
                    response: err
                };

                var error = new Error(params);
                res.json({ error });
            });

    }; // fim this.deleteById

}

module.exports = UserPersistenceSequelize;
