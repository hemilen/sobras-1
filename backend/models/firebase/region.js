/**
 * @author: Helen de Freitas Santos
 * @date: 07/07/2018
 * @desc: methods for fetching mysql data
*/

'use strict'

module.exports = (ref) => {  
    
    var Region = ref.child("regions");
 
    return Region;

};