
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
        error  = {  msg:      'Body must not be null'};

        errors.push(error);
    }

    if(!req.body.name){
        error  = {  msg:      'Nome deve ser informado'};

        errors.push(error);
    }

    req.assert(req.email, 'Email invalido').isEmail();
    if(!req.body.email){
        error  = {  msg:      'Email deve ser informado'};

        errors.push(error);
    }
    if(!req.body.password){
        error  = {  msg:      'Senha deve ser informada'};

        errors.push(error);
    }


    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = UserValidator