/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var Donation = function(params) {
    this.id          = params.id;
    this.qtt         = params.qtt;
    this.date        = params.date;
    this.status      = params.status;
    this.description = params.description;

    // Aqui tenho um atributo que é o usuário.
    // Como representá-la aqui? Essa é a melhor forma?
    this.userId      = params.userId;
    this.productId   = params.productId;
    this.cityId      = params.cityId;
}

module.exports = Donation;