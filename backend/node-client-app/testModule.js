var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("sobra/secret_document");

var regionsRef = ref.child("regions");

var region = {
    name:     'Teste 01',
    initials: 'T1'
  }



// Inserir Vários
var delayedPush = 
    function (region) {
        return new Promise(function (resolve, reject) {
            regionsRef.push(region)
                      .then(resolve, reject);
        });
    };



delayedPush({
  name: "Norte",
  initials: "N"
})
.then(function() {
  return delayedPush({ // qual a função desse return? eu retirei e funcionou mesmo assim
    name: "Nordeste",
    initials: "NE"
  });
})
.then(function() {
  return delayedPush({
    name: "Centro-Oeste",
    initials: "CO"
  });
})
.then(function() {
  return delayedPush({
    name: "Sudeste",
    initials: "SE"
  });
})
.then(function() {
  return delayedPush({
    name: "Sul",
    initials: "S"
  });
});


const validate = (initials) => new Promise(function(resolve, reject){
    //var db = firebase.database();
    //var ref = db.ref("sobra/secret_document");
    //var regionsRef = ref.child("regions");
    regionsRef.orderByChild("initials")
              .equalTo(initials)
              .on("value", 
                  function(snapshot) {
                     resolve(snapshot.val() ? true : false);
                  }, 
                  function(errorObject) {
                     reject(false);
                  }
              );
});

// chama o método que retorna uma promise
// a promise tem o then para ser executado
// e tem o catch para qualquer tipo de erro
validate(region.initials)
    .then((data) => {
        if (data) {
            //response.send('insere');
            console.log("inserir");
        } else {
            //response.send('não insere');
            console.log("erro");
        }
    });


var getByInitials = 
  function (initials) {
      return new Promise(function (resolve, reject) {
          regionsRef.orderByChild("initials")
                    .equalTo(initials)
                    .on("value", 
                        function(snapshot) {
                           console.log("mmmmmmm ", snapshot.val())
                           resolve(snapshot.val() ? true : false);
                        },
                        function(errorObject) {
                           reject(false);
                        }
                    );
      }); // fim return new Promise(function (resolve, reject) {
  }; // fim function (initials) {


getByInitials(region.initials)
.then((data) => {
    // Se a região NÃO existe --> pode inserir
    if (!data) {
        //response.send('insere');
        delayedPush({
            name: region.name,
            initials: region.initials
        })          
        console.log("inserir");
    }
    // Se a região existe --> NÃO pode inserir
    else {
        //response.send('não insere');
        console.log("erro");
    }
});


//getByInitials("S");