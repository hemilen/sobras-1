var admin = require("firebase-admin");

var serviceAccount = require("./node-client-app/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://massive-cocoa-210221.firebaseio.com"
});
