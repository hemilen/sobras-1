/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var Error        = require('../../entity/error.js');

function RegionPersistenceSequelize() {
    // tidy up the object data
    // Exemplo para gerar JSON
    this.getObject = function (object) {
        const resObj = object.map(region => {
            //tidy up the region data
            return Object.assign(
                {},
                {
                    id: region.id,
                    name: region.name,
                    initials: region.initials,
                    states: region.states.map(state => {
                        //tidy up the state data
                        return Object.assign(
                            {},
                            {
                                id: state.id,
                                regionId: state.regionId,
                                name: state.name,
                                initials: state.initials,
                                cities: state.cities.map(city => {
                                    //tidy up the city data
                                    return Object.assign(
                                        {},
                                        {
                                            id: city.id,
                                            stateId: city.stateId,
                                            name: city.name
                                        }
                                    ) // fim return Object.assign(
                                })
                            }
                        ) // fim return Object.assign(
                    })
                }
            ) // fim return Object.assign(
        }); // fim const resObj = region.map(region => {

        return resObj;
    } // fim this.getObject = function (object) {

    // get all objects data 
    this.getAll = function (db, res) {
        // calling acquire methods and passing callback method that will be execute query
        // return response to server 
        db.region
            .findAll({
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

        db.region
            //.findById(id)
            .findAll({
                where: { id: id },
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
        db.region
            .findAll({
                where: {
                    name: name
                },
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
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByName


    // get object by initials
    this.getByInitials = function (db, initials, res) {
        // get id as parameter to passing into query and return filter data
        db.region
            .findAll({
                where: {
                    initials: initials
                },
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
            })
            .then(object => {
                res.send(JSON.parse(JSON.stringify(object)));
            });
    }; // fim this.getByInitials


    // get quantity object by name
    this.getQttByName = function (db, name, res) {
        return new Promise((resolve, reject) => {
            db.region
                .count({ where: { name: name } })
                .then(
                    (qtt) => {
                        resolve(qtt);
                    }
                 ) // fim do then
                 .catch(
                     function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar região por nome',
                            response: erro
                        };

                        /*
                        Desse jeito não funciona
                        var error = {   location: 'persistence.relational.getQttByName', 
                                        param:    'name', 
                                        msg:      'Erro qtde de região por nome', 
                                        value:    name 
                                    };
                        */

                       var error = new Error(params);
                       reject(new Error (error));
                   }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByName


    // get quantity object by initiais
    this.getQttByInitials = function (db, initials, res) {
        return new Promise((resolve, reject) => {
            db.region
                .count({ where: { initials: initials } })
                .then(
                    (qtt) => {
                        //res.json({ qtde: qtt });
                        resolve(qtt);
                    }
                 ) // fim do then
                 .catch(
                     function ( erro ) {
                        var params = {
                            code:     500,
                            message:  'Erro ao buscar qtde de região por sigla',
                            response: erro
                        };

                        /*
                        Desse jeito não funciona
                        var error = {   location: 'persistence.relational.getQttByName', 
                                        param:    'name', 
                                        msg:      'Erro qtde de região por nome', 
                                        value:    name 
                                    };
                        */

                       var error = new Error(params);
                       reject(new Error (error));
                    }
                );// fim do catch
        });   // Closing of Promise block
    }; // fim this.getQttByInitials


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
                }, // fim do resolve getQttByName
                // reject
                function ( erro ) {
                    reject (erro);
                }// fim do reject getQttByName
            ); // fim do then getQttByName
        });   // Closing of Promise block
    }; // fim this.isNameInUse


    // verify is object by initials exists
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
                    }, // fim do resolve getQttByInitials
                    // reject
                    function ( erro ) {
                        reject (erro);
                        //reject(new Error("Sigla em uso " + erro));
                    }// fim do reject getQttByInitials
                );// fim do then getQttByInitials 
            });   // Closing of Promise block
    }; // fim this.isInitialsInUse


    this.add = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.region
            .create(object)
            .then(function (addedRecord) {
                var params = {
                    code:     200,
                    message:  'OK',
                    response: 'Record is successfully added.'
                };
                /*
                // Dessa forma não funciona
                var params = { location: 'persistence.relational.add', 
                               param:    'object', 
                               msg:      'Record is successfully added.', 
                               value:    object
                };
                */

                var error = new Error(params);
                res.json(error);
            })
            .catch(function (err) {
                var params = {
                    code:     500,
                    message:  'Erro ao incluir região',
                    response: err
                };
                /*
                // Dessa forma não funciona
                var params = { location: 'persistence.relational.add', 
                               param:    'object', 
                               msg:      'Erro ao incluir região', 
                               value:    object
                };
                */

                var error = new Error(params);
                res.json(error);
            });
    }; // fim this.add


    this.update = function (db, object, res) {
        // get object as parameter to passing into query and return filter data
        db.region
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
                    message:  'Erro ao alterar região',
                    response: err
                };

                var error = new Error(params);
                res.json({error});
            });
    }; // fim this.update


    this.deleteById = function (db, id, res) {
        // get id as parameter to passing into query and return filter data
        db.region
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

module.exports = RegionPersistenceSequelize;
