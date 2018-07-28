/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: custom route for fetching data
*/

function RegionValidator() {

    // validate to add one object 
    this.validateAdd = function (req) {

        return new Promise((resolve, reject) => {

            req.sanitize('name').trim();
            req.sanitize('initials').trim();
    
            req.checkBody('name', 'Nome é obrigatório').trim().notEmpty();
            req.checkBody('initials', 'Sigla é obrigatória').trim().notEmpty();

            var errors = req.validationErrors();

            //resolve(errors);

            if (errors) {
                //res.statusCode = 500;
                //res.send(JSON.parse(JSON.stringify(errors)));
                resolve(errors);
                //res.json({ errors });
            }
            else {
                resolve();
            }
        
        });   // Closing of Promise block
    

        // Validar se o nome já está cadastrado         
        
//        req.checkBody('name','asdadad')
        /*
        .custom((name) => {
            business.isNameInUse(name)
            .then((isNameInUse) => {
                console.log("Nome da região está em uso? addddd " + isNameInUse);
                
                if (isNameInUse == true) {
                    console.log("in use");
                    //return new Error('this email is already in use');
                    //return true;
                }
                //else return false;
                

               return isNameInUse;
            });
        });
        */

        /*
       .custom((name) => {
            console.log("passei custom");
            return new Promise((resolve, reject) => {
                business.getQttByName(name)
                .then(qtt => {
                    console.log("THEN ", qtt);
                    if   (qtt == 0) {
                         console.log("RESOLVE");
                         resolve();
                         return false;
                    }
                    else {
                        console.log("REJECT");
                        throw new Error('this nome is already in use');
                            
                        validationErrors.req().throw(new Error('this nome is already in use'));
                        reject();
                        return true;
                    }
                })
                .catch( function ( erro ) {
                    console.log("Erro: " + erro);
                    //reject(new Error("Nome em uso " + erro));
                    reject();
                });
            });
       });
*/
                        /*reject({
                                location: "body",
                                param: "name",
                                msg: "Nome da região já está em uso",
                                value: name
                            });*/

        
        // Validar se a sigla já está cadastrada   
        /*      
        req.check('initials', 'Sigla já cadastrada').custom((initials) => {
            business.isInitialsInUse(initials, res)
            .then((isInitialsInUse) => {
                console.log("Sigla da região está em uso? " + isInitialsInUse);
                if (!isInitialsInUse)
                    return false;
            });
        });
        */

        /*
       var customErrors = req.validationErrors();;
       business.isNameInUse(req.body.name)
       .then((isNameInUse) => {
           console.log("Nome da região está em uso? addddd " + isNameInUse);
           if (isNameInUse == true) {
               console.log("in use");
               //return new Error('this email is already in use');
               //return true;
               var customErrors = { localtion: 'body', 
                                    param: 'name', 
                                    msg: 'mail does not match!', 
                                    value: req.body.name };
                console.log("asdasdas ", customErrors);
            }
           //else return false;

          //return isNameInUse;
       });
       */

 //      var errors = req.validationErrors();
    }
    
}

module.exports = new RegionValidator();