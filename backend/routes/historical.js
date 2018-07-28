/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        //custom route for fetching data
        var Controller = require('../controller/historical');
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/sobra/historical', function (req, res) {
            controller.getAll(res);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/sobra/historical/:id/', function (req, res) {
            controller.getById(req, res);
        });

        // here we gets status from request and passing to it object method.
        app.get('/rest/sobra/historicalbystatus/:status/', function (req, res) {
            controller.getByStatus(req, res);
        });


        // here we insert an object.
        app.post('/rest/sobra/historical', function (req, res) {
            controller.add(req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/sobra/historical/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }
};