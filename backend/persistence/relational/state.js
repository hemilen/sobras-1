/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Error = require('../../entity/error.js');


function StatePersistence() {
    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 

        db.state
            .findAll({
                attributes: { exclude: ['regionId'] },
                include: [
                    {
                      model: db.region
                    },
                    {
                      model: db.city,
                      include: [
                          {
                              model: db.state
                          }
                      ]
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

        db.state
            .findAll({ 
                attributes: { exclude: ['regionId'] },
                where: {id: id},
                include: [
                    {
                        model: db.region
                    },
                    {
                        model: db.city
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
        db.state
            .findAll({
                attributes: { exclude: ['regionId'] },
                where: {name: name},
                include: [
                    {
                        model: db.region
                    },
                    {
                        model: db.city
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getByName = function (name, res) {


    // get object by initials
    this.getByInitials = function (db, initials, res) {
        // get id as parameter to passing into query and return filter data
        db.state
            .findAll({
                attributes: { exclude: ['regionId'] },
                where: {initials: initials},
                include: [
                    {
                        model: db.region
                    },
                    {
                        model: db.city
                    }
                ]
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // this.getByInitials = function (initials, res) {
    

    // get quantity object by name
    this.getQttByName = function (db, name) {
        return new Promise((resolve, reject) => {
            db.state
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
                            message:  'Erro ao buscar estado por nome',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                });// fim do catch
        });   // Closing of Promise block
    }; // this.getQttByName = function (name, res) {
   

    // get quantity object by initiais
    this.getQttByInitials = function (db, initials, res) {
        return new Promise((resolve, reject) => {
            db.state
                .count({where: {initials: initials}})
                .then(
                    (qtt) => {
                        //res.json({qtde: qtde});
                        //res.send(JSON.parse(JSON.stringify(qtde)));
                        resolve(qtt);
                    }
                )
                .catch( 
                    function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar estado por sigla',
                            response: erro
                        };

                       var error = new Error(params);
                       reject(new Error (error));
                });// fim do catch
        });   // Closing of Promise block
    }; // this.getQttByInitials = function (initials, res) {

    
    this.isNameInUse = function (db, name, res) {
        return new Promise((resolve, reject) => {
            var isNameInUse = false;

            this.getQttByName(db, name)
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
                    reject (erro);
                }// fim do reject getQttByName
            );// fim do then
        });   // Closing of Promise block    
    }; // this.isNameInUse = function (name, res) {

    
    this.isInitialsInUse = function (db, initials, res) {
        return new Promise((resolve, reject) => {
            var isInitialsInUse = false;

            this.getQttByInitials(db, initials, res)
                .then(
                    // resolve
                    (qtt) => {
                        if   (qtt == 0)
                            isInitialsInUse = false;
                        else isInitialsInUse = true;

                        resolve(isInitialsInUse);
                    }, // fim do resolve
                    // reject
                    function ( erro ) {
                        reject (erro);
                        //reject(new Error("Sigla em uso " + erro));
                    }// fim do reject getQttByInitials
                );// fim do then
        });   // Closing of Promise block
    }; // this.isInitialsInUse = function (initials, res) {
    
    
    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.state
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
                    message:  'Erro ao incluir estado',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.add = function (object, res) {

    
    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.state
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
                    message:  'Erro ao alterar estado',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // this.update = function (object, res) {
    

    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.state
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

module.exports = StatePersistence;