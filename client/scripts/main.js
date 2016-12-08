/**
 * Created by danielabrao on 11/2/16.
 */
(function () {
    "use strict";

    var factory = require("./factory.script");

    var elements = {
        "brokerStatus": document.getElementById("broker"),
        "initBrokerBtn": document.getElementById("init-broker")
    };


    var methods = {
        "prepareFormData": function () {
            var formData = new FormData();
            formData.set('type', 'raspberry');
            formData.set('device_id', '+');
            formData.set('evt', '+');
            formData.set('fmt', 'json');

        }
    };

    console.log('asdd');

    var body = methods.prepareFormData();


    elements.initBrokerBtn.addEventListener("click", function () {
        factory.initBroker().then(function () {
            console.log("broker initialized");
            factory.subscribeTopic(body).then(function (data) {
                console.log(data);
            });
        });
    });

    factory.getBrokerStatus().then(function (data) {
        console.log(data);
        elements.brokerStatus.style.backgroundColor = "green";
        elements.brokerStatus.innerHTML = data.message;
    }, function (errObj) {
        elements.brokerStatus.style.backgroundColor = "red";
        elements.brokerStatus.innerHTML = errObj.message;
        console.log(errObj);
    });


}());