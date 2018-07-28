/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var City = function(params) {
    this.id       = params.id;
    this.name     = params.name;

    // Aqui tenho um atributo que é o estado.
    // Como representá-la aqui? Essa é a melhor forma?
    this.stateId = params.stateId;
}

module.exports = City;