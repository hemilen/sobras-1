
// var Resposta = {
//     "status": "ok",
//     "code": 200,
//     "messages": [],
//     "result": {}
// }

var Resposta = function(params) {
    this.status   = params.status;
    this.code     = params.code;
    this.messages = params.messages;
    this.result   = params.result;
}

module.exports = Resposta;
