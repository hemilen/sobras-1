/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/
var validator = new (require('./validators/user.js'))()
var User = require('../entity/user.js');
var bCrypt = require('bcrypt-nodejs');

var Resposta = require('../entity/resposta.js');

function UserController() {
    var Persistence = require('../persistence/user.js');
    var persistence = new Persistence();

    // get all objects data 
    this.getAll = function (res) {

        persistence.getAll(res)
    };

    // get object by id 
    this.getById = function (req, res) {


        persistence.getById(req.params.id, res);
    };

    // get object by email
    this.getByEmail = function (req, res) {


        persistence.getByEmail(req.params.email, res);
    };

    // get object by birthDate
    this.getByBirthDate = function (req, res) {


        persistence.getByBirthDate(req.params.birthDate, res);
    };

    // get quantity of objects by email
    this.getQttByEmail = function (req, res) {


        persistence.getQttByEmail(req.params.email)
            .then((qtt) => {
                res.json({ qtde: qtt });
                console.log("Qtde de email com o nome " + req.params.name + ": " + qtt);
            });
    };

    // get quantity of objects by birthDate 
    this.getQttByBirthDate = function (req, res) {


        persistence.getQttByBirthDate(req.params.birthDate, res)
            .then((qtt) => {
                console.log("Qtde de usuário com a mesma data de nascimento " + req.params.birthDate + ": " + qtt);
            });
    };

    // get email of object in use 
    this.isEmailInUse = function (email, res) {


        persistence.isEmailInUse(email, res)
            .then((isEmailInUse) => {
                console.log("Email está em uso? " + isEmailInUse);
            });
    };


    // para criptografar password
    this.generateHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    // add one object 
    this.add = function (req, res) {
        
        let paramsResp = {
            status: "created",
            code: 201,
            messages: [],
            result: {}
        };

        Promise.all([
            new Promise((resolve, reject) => {
                var errors = validator.checkBody(req, res);

                if (errors.length > 0) {
                    paramsResp.messages = errors;
                    // allErrors.push(errors);
                    resolve();
                }
                else resolve();
            }),

            new Promise((resolve, reject) => {
                persistence.isEmailInUse(req.body.email, res)
                    .then(
                        // resolve
                        (data) => {
                            if (data) {
                                error = { msg: 'Email já está em uso' };
                                paramsResp.messages.push(error);
                                resolve();
                            }
                            else resolve();
                        }, // fim do resolve isNameInUse
                        // reject
                        function (erro) {
                            reject(erro);
                        }// fim do reject isNameInUse
                    ); // fim do then isNameInUse
            })
        ])
            .then(result => {
                if (paramsResp.messages.length > 0) {

                    paramsResp.code = 400;
                    paramsResp.status = "bad request";

                    res.status(400).send(new Resposta(paramsResp));
                }
                else {
                    // console.info('Ok ', allErrors);

                    var name = req.body.name;
                    var email = req.body.email;
                    var cellPhone = req.body.cellPhone;
                    var birthDate = new Date(parseInt(req.body.birthDate.substring(6, 10)),
                        parseInt(req.body.birthDate.substring(3, 5)) - 1,
                        parseInt(req.body.birthDate.substring(0, 2))
                    );
                    var registrationDate = new Date();
                    var password = this.generateHash(req.body.password);

                    var params = {
                        name: name,
                        email: email,
                        cellPhone: cellPhone,
                        birthDate: birthDate,
                        registrationDate: registrationDate,
                        password: password
                    }

                    var user = new User(params);

                    persistence.add(user, res);
                }// fim do else do if (allErrors.length > 0){

            })// fim do then
            .catch(reason => {
                console.warn('Failed!', reason, ' ', paramsResp.messages);
                res.status(400).send(new Resposta(paramsResp));
            }
            );// fim do catch

    }; // fim this.add = function (req, res) {

    // update one object 
    this.update = function (id, req, res) {

        let paramsResp = {
            status: "created",
            code: 201,
            messages: [],
            result: {}
        };

        // Usando o exemplo do Leonardo
        var errors = validator.checkBody(req);

        if (errors.length > 0) {
            paramsResp.messages = errors;
            paramsResp.code = 400;
            paramsResp.status = "bad request";
            res.status(400).send(new Resposta(paramsResp));
            
        }
        else {
            // var id = req.body.id;
            var name = req.body.name;
            var cellPhone = req.body.cellPhone;
            var birthDate = new Date(parseInt(req.body.birthDate.substring(6, 10)),
                parseInt(req.body.birthDate.substring(3, 5)) - 1,
                parseInt(req.body.birthDate.substring(0, 2))
            );

            var params = {
                name: name,
                cellPhone: cellPhone,
                birthDate: birthDate,
                id: id
            }

            var user = new User(params);

            persistence.update(user, res);
        }
    };// fim do update

    // delete one object 
    this.deleteById = function (id, res) {

        // fazer a validação aqui
        persistence.deleteById(id, res);
    };

}

module.exports = UserController;
