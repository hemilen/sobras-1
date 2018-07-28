
//Cria construtor
function DonationValidator() {

}


//Define as funções da classe
HistoricalValidator.prototype.checkBody = (req, res) => {
    var errors = []
    var error;

    if(!req.body){
        error  = {  location: 'body', 
                    param:    'body', 
                    msg:      'Body must not be null', 
                    value:     req.body };

        errors.push(error);
    }

    if(!req.body.donation.id){
        error  = {  location: 'body', 
                    param:    'donation.id', 
                    msg:      'Doação deve ser informada', 
                    value:     req.body.donation.id };

        errors.push(error);
    }

    if(!req.body.status){
        error  = {  location: 'body', 
                    param:    'status', 
                    msg:      'Status deve ser informada', 
                    value:     req.body.status };

        errors.push(error);
    }

    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = HistoricalValidator