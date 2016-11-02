/**
 * Created by danielabrao on 9/22/16.
 */
/*jslint node:true*/
(function () {
    "use strict";

    var Broker;

    module.exports = function (app, iotf_connections, io) {

        app.get("/getBrokerStatus", function (req, res) {
            console.log(Broker);
            if (Broker) {
                iotf_connections.checkConnection(Broker).then(function successCallback() {
                    return res.status(200).send("Broker online");
                }, function errorCallback() {
                    return res.status(500).send("Broker offline");
                });
            } else {
                return res.status(404).send("Broker not found");
            }
        });

        app.get("/disconnectBroker", function (req, res) {
            iotf_connections.closeConnection(Broker).then(function successCallback() {
                Broker = "";
                return res.status(200).send("Broker disconnected");
            });
        });

        app.get("/initBroker", function (req, res) {

            iotf_connections.checkConnection(Broker).then(function successCallback() {
                return res.status(200).json("Broker inicializado");

            }, function errorCallback() {
                iotf_connections.createConnection().then(function(brokerApp) {
                    Broker = brokerApp;
                    return res.status(200).json("Broker inicializado");
                }, function (err) {
                    console.log(err);
                    return res.status(500).send("Conexão falhou");
                });
            });
        });

        app.post("/subscribeTopic", function (req, res) {
            if (!Broker) {
                return res.status(500).send("Broker não inicializado");
            }

            console.log(req.body);

            var topic = [
                "iot-2",
                "type", req.body.type || "+",
                "id", req.body.id || "+",
                "evt", req.body.evt || "+",
                "fmt", req.body.fmt || "json"
            ].join("/");

            Broker.subscribe(topic, {
                "qos": 2
            });

            Broker.on("message", function(topic, payload) {
                console.log(topic);
                console.log(JSON.parse(payload));
                io.emit("payloadReceived", "teste");
            });

            return res.status(200).send([topic, "subscribed"].join(" "));
        });

        app.post("/publishCommand", function (req, res) {
            console.log(req.body);

            if (!req.body.id) {
                return res.status(500).send("ID não encontrado");
            }

            if (!req.body.cmd) {
                return res.status(500).send("Comando não encontrado");
            }
            if (!Broker) {
                return res.status(500).send("Broker não inicializado");
            }

            var topic = [
                "iot-2",
                "type", req.body.type || "raspberry",
                "id", req.body.id,
                "cmd", req.body.cmd || "+",
                "fmt", req.body.fmt || "json"
            ].join("/");

            var message = req.body.message || "Teste MQTT";

            Broker.publish(topic, "send payload", {
                "qos": 2
            });

            return res.status(200).send("message sent");
        });

    };

}());