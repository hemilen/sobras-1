/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/
//custom route for fetching data
var model = require('../models/transaction');

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        // adding route for transactions, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/transactions', function (req, res) {
            model.getAll(res);
        });

        // here we gets id from request and passing to it transaction method.
        app.get('/rest/transactionUser/:id/', function (req, res) {
            model.getByIdUser(req.params.id, res);
        });

        // here we gets id from request and passing to it transaction method.
        app.get('/rest/transaction/:id/', function (req, res) {
            model.getById(req.params.id, res);
        });

    }

};