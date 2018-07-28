/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        //custom route for fetching data
        var Controller = require('../controller/product');
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/sobra/products', function (req, res) {
            controller.getAll(res);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/sobra/product/:id/', function (req, res) {
            controller.getById(req, res);
        });

        // here we gets name from request and passing to it object method.
        app.get('/rest/sobra/productbyname/:name/', function (req, res) {
            controller.getByName(req, res);
        });


        // here we gets name from request and passing to it object method.
        app.get('/rest/sobra/productqttbyname/:name/', function (req, res) {
            controller.getQttByName(req, res);
        });


        // here we gets name from request and passing to it object method.
        app.get('/rest/sobra/productisnameinuse/:name/', function (req, res) {
            controller.isNameInUse(req.params.name, res);
        });

        // here we insert an object.
        app.post('/rest/sobra/product', function (req, res) {
            controller.add(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/product', function (req, res) {
            controller.update(req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/sobra/product/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }
};