/**
 * Created by danielabrao on 12/7/16.
 */
(function () {
    "use strict";
    (function () {
        "use strict";


        module.exports = function (app, passport) {
            app.get("/login", function (req, res) {
                return res.status(200).render("views/login.view.html");
            });

            app.post('/login',
                passport.authenticate('login', {
                    successRedirect: '/',
                    failureRedirect: '/loginFailure'
                })
            );

            app.get("/loginFailure", function (req, res) {
                return res.status(403).send("Não Autorizado");
            });
        };

    }());

}());