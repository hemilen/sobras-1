/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {

        //custom route for fetching data
        var Controller = require('../controller/donation');
        var controller = new Controller();

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/sobra/donations', function (req, res) {
            controller.getAll(res);
        });

        // here we gets id from request and passing to it object method.
        app.get('/rest/sobra/donation/:id/', function (req, res) {
            controller.getById(req, res);
        });

        // here we gets user from request and passing to it object method.
        app.get('/rest/sobra/donationbyuser/:userId/', function (req, res) {
            controller.getByUser(req, res);
        });

        // here we gets status from request and passing to it object method.
        app.get('/rest/sobra/donationbystatus/:status/', function (req, res) {
            controller.getByStatus(req, res);
        });

        // here we gets status from request and passing to it object method.
        app.get('/rest/sobra/donationqttbystatus/:status/', function (req, res) {
            controller.getQttByStatus(req, res);
        });

        // here we insert an object.
        app.post('/rest/sobra/donation', function (req, res) {
            controller.add(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/donation', function (req, res) {
            controller.update(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/donate', function (req, res) {
            controller.donate(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/canceldonation', function (req, res) {
            controller.cancel(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/giveupdonation', function (req, res) {
            controller.giveUp(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/undogiveupdonation', function (req, res) {
            controller.undoGiveUp(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/deliverydonation', function (req, res) {
            controller.delivery(req, res);
        });

        // here we update an object.
        app.put('/rest/sobra/canceldeliverydonation', function (req, res) {
            controller.cancelDelivery(req, res);
        });

        // here we delete an object passing id to it object method.
        app.delete('/rest/sobra/donation/:id', function (req, res) {
            controller.deleteById(req.params.id, res);
        });
    }
};