/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var User = function(params) {
    this.id               = params.id;
    this.name             = params.name;
    this.email            = params.email;
    this.cellPhone        = params.cellPhone;
    this.birthDate        = params.birthDate;
    this.registrationDate = params.registrationDate;
    this.password         = params.password;

}

module.exports = User;