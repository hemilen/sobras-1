/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

var model = require('../business/user');

function UserBusiness() {

    // get all users data 
    this.getAll = function (res) {
        model.getAll(res);
    };

    // get user by id 
    this.getById = function (req, res) {
        model.getById(req.params.id, res);
    };

    // get user by name 
    this.getByName = function (req, res) {
        model.getByName(req.params.name, res);
    };

    // get quantity of user by name 
    this.getQttByName = function (req, res) {
        var qtt = model.getQttByName(req.params.name, res);
        console.log('ssasa ', qtt);
    };

    // add one user 
    this.add = function (req, res) {
        var user = req.body;
        req.sanitize('name').trim();
        req.checkBody('name', 'Nome é obrigatório').trim().notEmpty();
        
        req.check('name','Nome já cadastrado').custom((name) => {
            return new Promise((resolve, reject) => {
                console.log('ENTREI ', name);
                //model.isNameInUse(name, (error, result) => {
                model.isNameInUse(name,(result) => {
                    console.log('MIGUEL ', result[0].qtt);
                    if(result[0].qtt > 0){
                        reject(new Error('Nome em uso'));
                    } else {
                      resolve();
                    }
                });
            });
        });

        
        
        /*
       .custom(value => {
            return model.isNameInUse(value,res)});
*/

        //req.check('name').custom(model.isNameInUse());
        //req.assert(user.name,'Não é email válido').isEmail();

/*
        console.log('aaaaa ', req.body.name);
        model.getQttByName(req.body.name, res);
        if (model.getQttByName(req.body.name, res) > 0) {
            var error = {param: "name", msg: "Nome já cadastrado", value: req.body.name};
            expressValidator._errors.push(error);
            //errors.push(error);
        }
*/
        var errors = req.validationErrors();

        if(errors){
            res.statusCode = 500;
            return res.json({errors})
        }
        else{
            

            model.add(req, res);
            
            //res.send('Dados validado com sucesso', 200);
        }

    };

    // update one user 
    this.update = function (req, res) {
        model.update(req, res);
    };

    // delete one user 
    this.deleteById = function (id, res) {
        model.deleteById(id, res);
    };

}

module.exports = new UserBusiness();