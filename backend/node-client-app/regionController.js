
var firebase = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});


const RegionController = {

  list: function(request, response, next) {

    /*
    () => { }
    é a mesma coisa que
    function () {}
    */

    const validate = (initials) => new Promise(function(resolve, reject){
        var db         = firebase.database();
        var ref        = db.ref("sobra/secret_document");
        var regionsRef = ref.child("regions");
        
        regionsRef.orderByChild("initials").equalTo(initials)
                    .on("child_added", function(snapshot) {
                        resolve(snapshot.val() ? true : false);
                    }, function(errorObject) {
                        reject(false);
                    });
    });

    validate('S')
        .then((data) => response.send(data));
  }
};

module.export = RegionController;

