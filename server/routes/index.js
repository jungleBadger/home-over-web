/*jslint node:true*/
(function () {
    'use strict';

    module.exports = function (app, io, passport) {
        app.get('/', function (req, res) {
            console.log(req.session);
            return res.status(200).render('main.ejs', {
                user: req.user || ''
            });
        });
    };

}());
