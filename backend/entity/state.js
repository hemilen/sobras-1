/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var State = function(params) {
    this.id       = params.id;
    this.name     = params.name;
    this.initials = params.initials;

    // Aqui tenho um atributo que é a região.
    // Como representá-la aqui? Essa é a melhor forma?
    this.regionId = params.regionId;
}

module.exports = State;