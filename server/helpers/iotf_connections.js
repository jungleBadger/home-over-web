/**
 * Created by danielabrao on 9/21/16.
 */
(function() {
    'use strict';

    module.exports = function (mqtt, localEnv, cloudEnv) {
        return {
            createConnection: function () {
                return new Promise(function (resolve, reject) {
                    var mqttApp = mqtt.connect(["mqtt://", (localEnv.IOTF_HOST || cloudEnv.services["iotf-service"].credentials.mqtt_host)].join(""), {
                        clientId: 'a:e8wjfx:a-e8wjfx-hpcxylqxb8',
                        username: localEnv.IOTF_KEY || cloudEnv.services["iotf-service"].credentials.apiKey,
                        password: localEnv.IOTF_TOKEN || cloudEnv.services["iotf-service"].credentials.apiToken,
                        clean: true
                    });

                    mqttApp.on('connect', function () {
                        resolve(mqttApp);
                    });

                    mqttApp.on('error', function (error) {
                        reject(error);
                    });
                });
            },
            checkConnection: function (mqttInstance) {

                return new Promise(function (resolve, reject) {
                    if (!mqttInstance) {
                        reject('Create new MQTT');
                        return;
                    }

                    if (mqttInstance.connected) {
                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            },
            closeConnection: function (mqttInstance) {
                return new Promise(function (resolve, reject) {
                    mqttInstance.end(false, function cb() {
                        resolve('Client disconnected');
                    });
                });
            }
        }

    };

}());
