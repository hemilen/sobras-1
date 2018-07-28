
//Cria construtor
function DonationValidator() {

}


//Define as funções da classe
DonationValidator.prototype.checkBody = (req, res) => {
    req.sanitize('description').trim();
    
    var errors = []
    var error;

    if(!req.body){
        error  = {  location: 'body', 
                    param:    'body', 
                    msg:      'Body must not be null', 
                    value:     req.body };

        errors.push(error);
    }

    if(!req.body.qtt){
        error  = {  location: 'body', 
                    param:    'qtt', 
                    msg:      'Quantidade deve ser informada', 
                    value:     req.body.qtt };

        errors.push(error);
    }

    if(!req.body.user.id){
        error  = {  location: 'body', 
                    param:    'user.id', 
                    msg:      'Usuário deve ser informado', 
                    value:     req.body.user.id };

        errors.push(error);
    }

    if(!req.body.product.id){
        error  = {  location: 'body', 
                    param:    'product.id', 
                    msg:      'Produto deve ser informado', 
                    value:     req.body.product.id };

        errors.push(error);
    }

    if(!req.body.city.id){
        error  = {  location: 'body', 
                    param:    'city.id', 
                    msg:      'Cidade deve ser informada', 
                    value:     req.body.city.id };

        errors.push(error);
    }

    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = DonationValidator