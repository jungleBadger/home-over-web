/**
 * Created by danielabrao on 12/8/16.
 */
(function() {
    "use strict";

    var LocalStrategy = require("passport-local").Strategy;

    var users = [{
        "accountId": "9E64CF5A-E978-B67C-9440-CBCDD99A89C5",
        "username": "Alexia",
        "userpass": "123",
        "role": "admin"
    }, {
        "accountId": "2ED8D07C-030C-C0CC-214B-D456CC095F17",
        "username": "Nickolas",
        "userpass": "123",
        "role": "driver"
    }, {
        "accountId": "85B638B5-DD2B-9EA8-BBFB-D69085E25765",
        "username": "Daniel",
        "userpass": "123",
        "role": "driver"
    }];

    module.exports = function (passport) {
        passport.serializeUser(function (user, done) {
            done(null, user);
        });

        passport.deserializeUser(function (user, done) {
            done(null, user);
        });

        passport.use('login', new LocalStrategy(
            function (username, password, done) {
                console.log(username, password);

                process.nextTick(function () {
                    for (var i = 0; i < users.length; i += 1) {
                        console.log(users[i]);
                        if (username == users[i].username && password == users[i].userpass) {
                            console.log("found");
                            return done(null, users[i]);
                        }
                    }

                    return done(null);


                });
            }
        ));
    }

})();