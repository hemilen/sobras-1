/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

var Region = function(params) {
    this.id       = params.id;
    this.name     = params.name;
    this.initials = params.initials;

}

module.exports = Region;