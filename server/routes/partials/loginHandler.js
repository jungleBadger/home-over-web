/**
 * Created by danielabrao on 12/7/16.
 */
(function () {
    "use strict";

    module.exports = function (app) {
        app.get("/login", function (req, res) {
            return res.status(200).render("views/login.view.html");
        });
    };

}());