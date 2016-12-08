/**
 * Created by danielabrao on 9/21/16.
 */
(function() {
    "use strict";

    module.exports = function (mqtt, localEnv, cloudEnv, io) {
        return {
            createConnection: function () {
                return new Promise(function (resolve, reject) {
                    var appClientConfig = {
                        "org": "e8wjfx",
                        "id": "hpcxylqxb8",
                        "auth-key": localEnv.IOTF_KEY || cloudEnv.services["iotf-service"][0].credentials.apiKey,
                        "auth-token": localEnv.IOTF_TOKEN || cloudEnv.services["iotf-service"][0].credentials.apiToken
                    };
                    var mqttApp = new mqtt.IotfApplication(appClientConfig);

                    mqttApp.connect();

                    mqttApp.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
                        console.log("Device Event from :: "+deviceType+" : "+deviceId+" of event "+eventType+" with payload : "+payload);
                        io.emit("statusReceived", JSON.parse(payload));

                    });

                    mqttApp.on("connect", function () {
                        mqttApp.subscribeToDeviceEvents();

                        resolve(mqttApp);
                    });



                    mqttApp.on("error", function (error) {
                        reject(error);
                    });
                });
            },
            checkConnection: function (mqttInstance) {

                return new Promise(function (resolve, reject) {
                    if (!mqttInstance) {
                        reject("Create new MQTT");
                        return;
                    }

                    if (mqttInstance.isConnected) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            },
            closeConnection: function (mqttInstance) {
                return new Promise(function (resolve, reject) {
                    mqttInstance.end(false, function cb() {
                        resolve("Client disconnected");
                    });""
                });
            }
        }

    };

}());
