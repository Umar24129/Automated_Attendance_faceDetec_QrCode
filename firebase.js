
///////////////

var admin = require("firebase-admin");

var serviceAccount = require("./firebasekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // databaseURL: "https://login-18f06.firebaseio.com"     // Add your own firebase login
});

///////
module.exports = {
    admin
}