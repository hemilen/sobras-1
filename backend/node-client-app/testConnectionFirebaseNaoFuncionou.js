var firebase = require('firebase-admin');


var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});


/*
// Dessa forma não funcionou
firebase.initializeApp({
  serviceAccount: "./serviceAccountKey.json",
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});
*/

var ref = firebase.app().database().ref();
var regionRef = ref.child('region');

var delayedPush = function (region) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      regionRef.push(region)
        .then(resolve, reject);
    }, 1);
  });
};

delayedPush({
  name: 'Teste Helen',
  initials: 'TH'
  //time: (new Date()).getTime()
})
.then(function() {
  return delayedPush({
    name: 'Outro Teste',
    initials: 'OT'
    //time: (new Date()).getTime()
  });
})
.then(function() {
  return delayedPush({
    name: 'Mais UM Teste',
    initials: 'MU'
    //time: (new Date()).getTime()
  });
})
.then(function() {
  regionRef.orderByKey().on('child_added', function(snap) {
    console.log(snap.getKey(), snap.val());
  });
})
.catch(function(err) {
  console.log('error', err);
});