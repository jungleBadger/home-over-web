(function () {
    "use strict";

    var express = require('express'),
        cfenv = require('cfenv'),
        app = express(),
        appEnv = cfenv.getAppEnv(),
        engines = require('consolidate'),
        path = require('path'),
        ejs = require('ejs'),
        compress = require('compression'),
        morgan = require('morgan'),
        server = require('http').createServer(app),
        passport = require('passport'),
        io = require('socket.io')(server);

    // app.use(express['static'](path.join(__dirname, './server/public/'), { maxAge: 16400000 }));
    app.use(express['static'](path.join(__dirname, './server/public/')));
    app.use(express['static'](path.join(__dirname, './client/')));

    app.use(compress());
    app.use(morgan('dev'));

    app.set('views', __dirname + '/client');
    app.engine('html', engines.ejs);
    app.set('view engine', 'html');

    require('./server/routes/index.js')(app, io, passport);

    app.listen(appEnv.port, '0.0.0.0', function() {
        console.log("server starting on " + appEnv.url);
    });
}());

