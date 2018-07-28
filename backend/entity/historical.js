/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var Historical = function(params) {
    this.id          = params.id;
    this.date        = params.date;
    this.status      = params.status;

    // Aqui tenho um atributo que é a doação.
    // Como representá-la aqui? Essa é a melhor forma?
    this.donationId  = params.donationId;
}

module.exports = Historical;