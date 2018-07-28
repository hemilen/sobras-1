var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});

var db = firebase.database();
var ref = db.ref("sobra/secret_document");

var regionsRef = ref.child("regions");

/*
ref.once("value", function(snapshot) {
  console.log("aqui ",snapshot.val());
  var regionList =   regionsRef.orderByChild("initials").equalTo("SS").on("child_added", function(snapshot) {
    if (snapshot.key == null) {
      console.log("null");
      error  = {  location: 'body', 
                  param:    'body', 
                  msg:      'Body must not be null', 
                  value:     req.body };

      errors.push(error);
    }
    else console.log("entrei ", snapshot.val(), " ", snapshot.key);
    return (snapshot.key);
  });
});

ref.once("child_added", function(snapshot) {
  console.log("aquijjjj ",snapshot.val());
});
*/


var region = {
  name:     'Teste 01',
  initials: 'T1'
}


// Create a new ref and save data to it in one step
// Geração automática de chave ( a new push key)
// Inserir UM
// Dúvida: add é o que? function ou variável?
/*
var add = regionsRef.push({
  name:     region.name,
  initials: region.initials
 });

 region.name     = "Teste 02";
 region.initials = "T2";
 add = regionsRef.push({
          name:     region.name,
          initials: region.initials
 });
 
 region.name     = "Teste 03";
 region.initials = "T3";
 add = regionsRef.push({
          name:     region.name,
          initials: region.initials
 });
*/ 


 // Inserir Vários
 /*
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

*/


region.name     = 'Sul';
region.initials = 'S';

/*
regionsRef.on('value', function (snapshot) {
 region = snapshot.val(); // Keep the local user object synced with the Firebase userRef
 console.log("hhhhh ", region); 
});


regionsRef.orderByChild("initials")
          .on("child_added", function(snapshot) {
            console.log("llllll ", snapshot.val()); 
          });


regionsRef.orderByChild("initials")
          .equalTo(region.initials)
          .on("child_added", function(snapshot) {
            console.log("mmmmmmm ", snapshot.val());
            return snapshot.key; 
          });


var callback = 
    function () {
      regionsRef.orderByChild("initials")
                .equalTo("SE")
                .on("child_added", function(snapshot) {
                  console.log("aaaaaa ", snapshot.val());
                  return snapshot.key; 
                });
    };

regionsRef.on('child_added', callback);
*/

// *******************************************************************
// Essa é a melhor forma ou a seguinte?
// Isto é: regionSearch é uma função e getByInitial é uma variável?
//         qual a melhor forma?
// *******************************************************************
var initials = 'NE'; 
var regionSearch = function() {
  var regionList = 
      regionsRef.orderByChild("initials")
                .equalTo("S")
                .on("child_added", function(snapshot) {
                    console.log("entrei ", snapshot.val(), " ", snapshot.key);
                    //return (snapshot.key);
                });
  
  // Tenho que colocar o return? 
  return (regionList.key);
};

// Isso não funciona. Mostra undefined. 
// Como devo fazer para testar se regionSearch encontrou uma região?
// Se não encontrou aí eu devo chamar o método para incluir 
//console.log("xxxxxx", regionSearch());

/*
var getByInitials = 
    regionsRef.orderByChild("initials")
              .equalTo(region.initials)
              .on("value", function(snapshot) {
                  console.log("entrei kkkkkk ", snapshot.val(), " ", snapshot.key);
              });
*/

/*
var obter = function() {
  console.log("EEEEEEEEEEEEEEEEEEEEEEEEE");
  if (regionSearch('S')) {
    console.log("HHHHHEEEEELLLLLLEEEEENNNN");
      region.name     = "Sul";
      region.initials = "S";
      add = regionsRef.push({
             name:     region.name,
             initials: region.initials
      })
  }
};
*/

var callback = 
    function () {
      console.log("EEEEEEEEEEEEEEEEEEEEEEEEE");
      if (!regionSearch('S')) {
        console.log("HHHHHEEEEELLLLLLEEEEENNNN");
          region.name     = "Sul";
          region.initials = "S";
          add = regionsRef.push({
                 name:     region.name,
                 initials: region.initials
          })
      }
      else console.log("ENCONTROU");
    };

regionsRef.once('value', callback);

/*
var getByInitials = 
    regionsRef.orderByChild("initials")
              .equalTo(region.initials)
              .on("child_added", function(snapshot) {
                  //
                  //if (snapshot.key == null) {
                  //    console.log("null");
                  //    error  = {  location: 'body', 
                  //                param:    'body', 
                  //                msg:      'Body must not be null', 
                  //               value:     req.body };

                  //    errors.push(error);
                  //}
                  //else
                  // 
                  if (snapshot.key != null) {
                      console.log("entrei kkkkkk ", snapshot.val(), " ", snapshot.key);
                  }

              });

var callback = 
    function (snapshot) {
      if (getByInitials() != null) {
          regions.push(region);
      }
    };

regionsRef.on('child_added', callback);
*/

/*
var add = function (region) {
  console.log("ENteisdsfs");
  return new Promise(function (resolve, reject) {
    console.log("sadas ", getByInitials());
    if   (getByInitials() != null) {
        regionsRef.push(region)
          .then(resolve, reject);
          
          //.then(function () {
          //});
          
        }
    }, 1);
};
*/


// Não sei o que isso faz
/*
var regions = [];
var callback = function (snap) {
 regions.push(snap.val())
 if (regions.length > 10) {
  regionsRef.off('child_added', callback);
 }
};
regionsRef.on('child_added', callback);
*/

/*
// Exemplo com SET
var nameOne     = "Norte";
var initialsOne = "N";
var nameTwo     = "Sul";
var initialsTwo = "S";

// Cria o registro com uma chave definida
regionsRef.set({
  nameOne: {
    name: nameOne,
    initials: initialsOne
  },
  nameTwo: {
    name: nameTwo,
    initials: initialsTwo
  }
});
*/

/*
 // Inserir Vários
 var delayedPush = function (region) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      regionsRef.push(region)
        .then(resolve, reject);
    }, 1);
  });
};


delayedPush({
  name: "Norte",
  initials: "N"
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
})
*/
///* Exemplos
//.then(function() {
//  regionsRef.orderByKey().on("child_added", function(snapshot) {
//    //console.log(snapshot.getKey(), snapshot.val());
//    console.log(snapshot.val());
//  });
//})
//*/
///* Exemplos
//.then(function() {
//  regionsRef.orderByChild("name").on("child_added", function(snapshot) {
//    //console.log(snapshot.val() + " " + snapshot.key + " " + snapshot.val().name + " " + snapshot.val().initials);
//    //console.log(snapshot.val(), " ", snapshot.key, " ", snapshot.val().name, " ", snapshot.val().initials);
//    console.log(snapshot.val());
//  });
//})
//*/
/*
.then(function() {
  regionsRef.orderByChild("initials").equalTo("SE").on("child_added", function(snapshot) {
    // Exemplos
    //console.log(snapshot.val() + " " + snapshot.key + " " + snapshot.val().name + " " + snapshot.val().initials);
    //console.log(snapshot.val(), " ", snapshot.key, " ", snapshot.val().name, " ", snapshot.val().initials);
    console.log(snapshot.val());
  });
})
.catch(function(err) {
  console.log('error', err);
});
*/

