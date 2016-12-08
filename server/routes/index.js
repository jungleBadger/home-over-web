/*jslint node:true*/
(function () {
    "use strict";
    var deviceRoutes = require("./partials/deviceHandler"),
        brokerRoutes = require("./partials/brokerHandler"),
        loginRoutes = require("./partials/loginHandler"),
        isLoggedIn = function (req, res, next) {
            if (req.isAuthenticated()) {
                return next();
            } else {
                return res.redirect("/login");
            }

        };

    module.exports = function (app, io, passport, iotf_configs, iotf_connections, request, authMiddleware) {
        deviceRoutes(app, iotf_configs, iotf_connections, request);
        brokerRoutes(app, iotf_connections, io);
        loginRoutes(app, passport);

        app.get("/", isLoggedIn, function (req, res) {
            console.log(req.session);
            return res.status(200).render("main.ejs", {
                user: req.user || ""
            });
        });
    };

}());
