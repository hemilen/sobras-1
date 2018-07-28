/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Error = require('../../entity/error.js');


function CityPersistence() {
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 

        db.city
            .findAll({
                attributes: { exclude: ['stateId'] },
                include: [
                    {
                        model: db.state
                    }
                ],
                // Add order conditions here....
                order: [
                    ['name', 'ASC']
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getAll = function (res) {

    // get object by id
    this.getById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data

        db.city
            .findAll({ 
                attributes: { exclude: ['stateId'] },
                where: {id: id},
                include: [
                    {
                        model: db.state
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            })
    }; // this.getById = function (id, res) {

    // get object by name
    this.getByName = function (db, name, res) {
        // get id as parameter to passing into query and return filter data
        db.city
            .findAll({
                attributes: { exclude: ['stateId'] },
                where: {name: name},
                include: [
                    {
                        model: db.state
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getByName = function (name, res) {


    // get object by state
    this.getByState = function (db, stateId, res) {
        // get id as parameter to passing into query and return filter data
        db.city
            .findAll({
                attributes: { exclude: ['stateId'] },
                where: {stateId: stateId},
                include: [
                    {
                        model: db.state
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getByInitials = function (state, res) {
    

    // get quantity object by name
    this.getQttByName = function (db, name) {
        return new Promise((resolve, reject) => {
            db.city
                .count({where: {name: name}})
                .then(
                    (qtt) => {
                        resolve(qtt);
                    }
                )// fim do then
                .catch( 
                    function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar cidade por nome',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                    }
                ); // fim do catch
        });   // Closing of Promise block
    }; // this.getQttByName = function (name, res) {
   

    // get quantity object by state
    this.getQttByState = function (db, stateId, res) {
        return new Promise((resolve, reject) => {
            db.state
                .count({where: {stateId: stateId}})
                .then(
                    (qtt) => {
                        //res.json({qtde: qtde});
                        //res.send(JSON.parse(JSON.stringify(qtt)));
                        resolve(qtt);
                    }
                )// fim do then
                .catch( 
                    function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar qtde de região por sigla',
                            response: erro
                        };
    
                        var error = new Error(params);
                        reject(new Error (error));
                    }
                );// fim do catch
        });   // Closing of Promise block
    }; // this.getQttByState = function (db, stateId, res) {

    
    // verify is object by name exists
    //this.isNameInUse = function (name, res, callback) {
    //this.isNameInUse = function (name, error, res) {
    this.isNameInUse = function (db, name, res) {
        return new Promise((resolve, reject) => {
            var isNameInUse = false;

            this.getQttByName(db, name)
            .then( 
                //resolve
                (qtt) => {
                    if   (qtt == 0)
                        isNameInUse = false;
                    else isNameInUse = true;

                    resolve(isNameInUse);
                }, // fim do resolve
                // reject
                function ( erro ) {
                    reject (erro);
                }// fim do reject
            );// fim do then
        });   // Closing of Promise block    
    }; // this.isNameInUse = function (name, res) {
    
    
    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.city
            .create(object)
            // Também pode passar os campos individualmente
            //.create({name: object.name, initials: object.initials, regionId: object.region.id})
            .then(function (addedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };

                var error = new Error(params);
                res.json({error});
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir cidade',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.add = function (object, res) {

    
    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.city
            .update(object,
            //Pode ser assim também
            //.update({name: object.name, initials: object.initials, regionId: object.region.id},
                {where: {
                    id: object.id
                }})
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
                    message:  'Erro ao alterar cidade',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.update = function (object, res) {
    

    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.city
            .destroy({
                where: {
                    id: id
                }})
            .then(function (deletedRecord) {
                if (deletedRecord === 1) {
                    code = 200;
                    message = 'OK';
                    response = 'Record is successfully deleted.';
                } 
                else {
                        code = 404;
                        message = 'OK';
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

    }; // this.deleteById = function (id, res) {

}

module.exports = CityPersistence;