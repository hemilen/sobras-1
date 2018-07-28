/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/
var validator    = new (require('./validators/historical.js'))()
var Historical   = require('../entity/historical.js');

function HistoricalController() {
    var Persistence         = require('../persistence/historical.js');
    var persistence         = new Persistence();

    var PersistenceDonation = require('../persistence/donation.js');
    var persistenceDonation = new PersistenceDonation();

    // get all objects data 
    this.getAll = function (res) {
        persistence.getAll(res);
    };

    // get object by id 
    this.getById = function (req, res) {
        persistence.getById(req.params.id, res);
    };

    // get object by status 
    this.getByStatus = function (req, res) {
        persistence.getByStatus(req.params.status, res);
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
                persistenceDonation.getById(req.body.donation.id)
                .then(
                    // resolve
                    (data) => {
                        if (data) {
                            error  = {  location: 'body', 
                                        param:    'donation.id', 
                                        msg:      'Doação não encontrada', 
                                        value:     req.body.donation.id
                                    };
    
                            allErrors.push(error);
                            resolve();
                        }    
                        else resolve();
                    }, // fim do resolve getById
                    // reject
                    function ( erro ) {
                        reject(erro);
                    }// fim do reject getById
                ); // fim do then getById
            }),
          ]).then(result=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                console.info('Ok ', allErrors);
                var params = {
                    date:        new Date(),
                    status:      req.body.status,
                    donationId:  req.body.donation.id
                 }

                var historical = new Historical(params);

                persistence.add(historical, res);
            }

          }).catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        });
    }; // fim this.add = function (req, res) {


    // delete one object 
    this.deleteById = function (id, res) {
        // fazer a validação aqui
        persistence.deleteById(id, res);
    }; // fim this.deleteById = function (id, res) {

}

module.exports = HistoricalController;
