/*jslint node:true*/
(function () {
    'use strict';
    var deviceRoutes = require('./partials/deviceHandler'),
        brokerRoutes = require('./partials/brokerHandler');

    module.exports = function (app, io, passport, iotf_configs, iotf_connections, request, authMiddleware) {
        deviceRoutes(app, iotf_configs, iotf_connections, request);
        brokerRoutes(app, iotf_connections, io);

        app.get('/', authMiddleware, function (req, res) {
            console.log(req.session);
            return res.status(200).render('main.ejs', {
                user: req.user || ''
            });
        });
    };

}());
