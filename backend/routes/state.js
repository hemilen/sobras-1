/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {
        //custom route for fetching data
        var Controller = require('../controller/state');
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/states', function (req, res) {
            controller.getAll(res);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/state/:id/', function (req, res) {
            controller.getById(req, res);
        });

        // here we gets name from request and passing to it object method.
        app.get('/rest/statebyname/:name/', function (req, res) {
            controller.getByName(req, res);
        });

        // here we gets initials from request and passing to it object method.
        app.get('/rest/statebyinitials/:initials/', function (req, res) {
            controller.getByInitials(req, res);
        });

        // here we gets name from request and passing to it object method.
        app.get('/rest/stateqttbyname/:name/', function (req, res) {
            controller.getQttByName(req, res);
        });

        // here we gets name from request and passing to it object method.
        app.get('/rest/stateqttbyinitials/:name/', function (req, res) {
            controller.getQttByInitials(req, res);
        });

        // here we gets name from request and passing to it object method.
        app.get('/rest/stateisnameinuse/:name/', function (req, res) {
            controller.isNameInUse(req.params.name, res);
        });

        // here we gets initials from request and passing to it object method.
        app.get('/rest/stateisinitialsinuse/:name/', function (req, res) {
            controller.isInitialsInUse(req.params.initials, res);
        });

        // here we insert an object.
        app.post('/rest/state', function (req, res) {
            controller.add(req, res);
        });

        // here we update an object.
        app.put('/rest/state', function (req, res) {
            controller.update(req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/state/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }

};