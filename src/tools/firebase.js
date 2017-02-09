"use strict";
/**
 * Created by fitzpatt on 2/7/2017.
 */
var Firebase = require("firebase");
var mdl_1 = require("./mdl");
var fire = {
    db: null,
    auth: null,
    storage: null,
    user: null,
    sign: {
        "in": null,
        out: null,
        up: null,
        update: null
    }
};
var firebase = Firebase.initializeApp({
    apiKey: "AIzaSyBXL-rNE_oAIrpKasYYvJYNvSgxsqtNOSg",
    authDomain: "tw1ll-a7f80.firebaseapp.com",
    databaseURL: "https://tw1ll-a7f80.firebaseio.com",
    storageBucket: "tw1ll-a7f80.appspot.com",
    messagingSenderId: "360849592984"
});
fire.db = firebase.database();
fire.auth = firebase.auth();
fire.storage = firebase.storage();
fire.user = function () {
    return fire.auth.currentUser;
};
fire.sign["in"] = function (user, pass) {
    fire.auth.signInWithEmailAndPassword(user, pass)["catch"](function (e) {
        mdl_1["default"].snackbar(e.message);
    });
};
fire.sign.out = function () {
    fire.auth.signOut();
};
fire.sign.up = function (user, pass) {
    fire.auth.createUserWithEmailAndPassword(user, pass).then(function () {
        var user = fire.user();
        fire.db.ref("users/" + user.uid).set({
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
            uid: user.uid
        });
    })["catch"](function (e) {
        mdl_1["default"].snackbar(e.message);
    });
};
fire.sign.update = function (user) {
    var u = fire.user();
    u.updateProfile(user);
};
exports.__esModule = true;
exports["default"] = fire;
