/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        //custom route for fetching data
        var Controller = require('../controller/user');
        var controller = new Controller();


        // CORS on ExpressJS - Matheus Piaui
        app.use(function(req, res, next) {
            res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS')
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });


        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/user', function (req, res) {
            controller.getAll(res);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/user/:id/', function (req, res) {
            controller.getById(req, res);
        });

        // here we gets email from request and passing to it object method.
        app.get('/rest/user/email/:email/', function (req, res) {
            controller.getByEmail(req, res);
        });

        // here we gets birthDate from request and passing to it object method.
        app.get('/rest/user/birthdate/:birthDay/', function (req, res) {
            controller.getByBirthDate(req, res);
        });

        // here we gets email from request and passing to it object method.
        app.get('/rest/user/qtt/email/:email/', function (req, res) {
            controller.getQttByEmail(req, res);
        });

        // here we gets birthDate from request and passing to it object method.
        app.get('/rest/user/qtt/birthdate/:birthDay/', function (req, res) {
            controller.getQttByBirthDate(req, res);
        });

        // here we gets email from request and passing to it object method.
        app.get('/rest/user/inuse/email/:email/', function (req, res) {
            controller.isEmailInUse(req.params.email, res);
        });

        // here we insert an object.
        app.post('/rest/user', function (req, res) {
            controller.add(req, res);
        });

        // here we update an object.
        app.put('/rest/user/:id', function (req, res) {
            controller.update(req.params.id, req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/user/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }
};