
//Cria construtor
function ProductValidator() {

}


//Define as funções da classe
ProductValidator.prototype.checkBody = (req, res) => {
    req.sanitize('name').trim();
    
    var errors = []
    var error;

    if(!req.body){
        error  = {  location: 'body', 
                    param:    'body', 
                    msg:      'Body must not be null', 
                    value:     req.body };

        errors.push(error);
    }

    if(!req.body.name){
        error  = {  location: 'body', 
                    param:    'name', 
                    msg:      'Nome deve ser informado', 
                    value:     req.body.name };

        errors.push(error);
    }


    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = ProductValidator