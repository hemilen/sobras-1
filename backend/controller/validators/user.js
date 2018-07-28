
//Cria construtor
function UserValidator() {

}


//Define as funções da classe
UserValidator.prototype.checkBody = (req, res) => {
    req.sanitize('name').trim();
    req.sanitize('email').trim();
    req.sanitize('cellPhone').trim();
    req.sanitize('password').trim();
    
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

    req.assert(req.email, 'Email invalido').isEmail();
    if(!req.body.email){
        error  = {  location: 'body', 
                    param:    'email', 
                    msg:      'Email deve ser informado', 
                    value:     req.body.email };

        errors.push(error);
    }
    if(!req.body.password){
        error  = {  location: 'body', 
                    param:    'password', 
                    msg:      'Senha deve ser informada', 
                    value:     req.body.password };

        errors.push(error);
    }


    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = UserValidator