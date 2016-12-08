/**
 * Created by danielabrao on 11/2/16.
 */
(function () {
    "use strict";

    var factory = require("./factory.script"),
        socket = require('../../server/public/libs/socket.io-client/socket.io')();


    var elements = {
        "brokerStatus": document.getElementById("broker"),
        "initBrokerBtn": document.getElementById("init-broker"),
        "disconnectBrokerBtn": document.getElementById("kill-broker"),
        "ultrasonic": document.getElementById("ultrasonic"),
        "light0": document.querySelector("#light0 .light-value"),
        "light1": document.querySelector("#light1 .light-value"),
        "light0OffBtn": document.querySelector("#light0 .lightDown"),
        "light0UpBtn": document.querySelector("#light0 .lightUp"),
        "light1OffBtn": document.querySelector("#light1 .lightDown"),
        "light1UpBtn": document.querySelector("#light1 .lightUp")

    };


    var methods = {
        "prepareFormData": function () {
            var formData = new FormData();
            formData.type = 'raspberry';
            formData.device_id = '+';
            formData.evt = '+';
            formData.fmt = "json";
            return formData;
        },
        "updateSensorRead": function (sensor) {
            for (var prop in sensor) {
                if (sensor.hasOwnProperty(prop)) {
                    document.querySelector(["#", prop, "> .sensor-value"].join("")).innerHTML = sensor[prop].distance + " cm";
                }
            }
        },
        "updateLightStatus": function (lights) {
            for (var prop in lights) {
                var status;
                if (lights.hasOwnProperty(prop)) {
                    if (lights[prop]) {
                        status = "On";
                        elements[prop + "UpBtn"].style.display = "none";
                        elements[prop + "OffBtn"].style.display = "block";

                    } else {
                        status = "Off";
                        elements[prop + "OffBtn"].style.display = "none";
                        elements[prop + "UpBtn"].style.display = "block";
                    }
                    elements[prop].innerHTML = status;
                }
            }


        },
        "getBrokerStatus": function () {
            factory.getBrokerStatus().then(function (data) {
                console.log(data);
                elements.brokerStatus.style.backgroundColor = "green";
                elements.brokerStatus.innerHTML = data.message;
                elements.initBrokerBtn.style.display = "none";
                elements.disconnectBrokerBtn.style.display = "block";
            }, function (errObj) {
                elements.brokerStatus.style.backgroundColor = "red";
                elements.brokerStatus.innerHTML = errObj.message;
                console.log(errObj);
                elements.disconnectBrokerBtn.style.display = "none";
                elements.initBrokerBtn.style.display = "block";

            });
        },
        "init": function () {

            this.getBrokerStatus();
            var body = this.prepareFormData();
            console.log(body);

            elements.initBrokerBtn.addEventListener("click", function () {
                factory.initBroker().then(function () {
                    console.log("broker initialized");
                    methods.getBrokerStatus();
                });
            });

            elements.disconnectBrokerBtn.addEventListener("click", function () {
                console.log("here");
                factory.disconnectBroker().then(function () {
                    console.log("broker disconnected");
                    methods.getBrokerStatus();
                });
            });
        }
    };



    window.onload = function onWindowLoad() {

        methods.init();

        socket.on("connect", function () {
            console.log('connected');
        });

        socket.on("statusReceived", function (payload) {
            console.log(payload);

            methods.updateLightStatus(payload.lights);
            payload.sensor.forEach(function(sensor) {
                methods.updateSensorRead(sensor);
            });

        });
    };


}());