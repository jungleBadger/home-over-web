(function () {
    "use strict";

    var express = require('express'),
        cfenv = require('cfenv'),
        app = express(),
        appEnv = cfenv.getAppEnv(),
        localEnv = require('node-env-file')(__dirname + '/.env', {raise: false}),
        engines = require('consolidate'),
        path = require('path'),
        mqttConnection = require('mqtt'),
        mqttClient = require('ibmiotf'),
        iotf_configs = require('./server/configs/ibm_iotf.js')(localEnv, appEnv),
        iotf_connections = require('./server/helpers/iotf_connections')(mqttClient, localEnv, appEnv),
        ejs = require('ejs'),
        compress = require('compression'),
        morgan = require('morgan'),
        server = require('http').createServer(app),
        passport = require('passport'),
        io = require('socket.io')(server),
        request = require('request'),
        authMiddleware = require("./server/helpers/authMiddleware"),
        bodyParser = require('body-parser');


    // app.use(express['static'](path.join(__dirname, './server/public/'), { maxAge: 16400000 }));

    app.use(express['static'](path.join(__dirname, './server/public/')));
    app.use(express['static'](path.join(__dirname, './client/')));

    app.use(compress());
    app.use(morgan('dev'));
    app.use(bodyParser.json()); // get information from html forms
    app.use(bodyParser.urlencoded({ extended: false }));

    app.set('views', __dirname + '/client');
    app.engine('html', engines.ejs);
    app.set('view engine', 'html');

    require('./server/routes/index.js')(app, io, passport, iotf_configs, iotf_connections, request, authMiddleware);

    app.listen(appEnv.port, '0.0.0.0', function() {
        console.log("server starting on " + appEnv.url);
    });
}());

