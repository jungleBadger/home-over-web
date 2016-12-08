/**
 * Created by danielabrao on 12/7/16.
 */
(function (window) {
    "use strict";

    module.exports = {
        "getBrokerStatus": function () {
            return new Promise(function (resolve, reject) {
                window.fetch("/getBrokerStatus")
                    .then(function (response) {
                        if (response.status === 404) {
                            return reject({
                                "status": response.status,
                                "message": "offline"
                            });
                        }

                        if (response.status === 500) {
                            return reject({
                                "status": response.status,
                                "message": "error"
                            });
                        } else {
                             return resolve({
                                "status": response.status,
                                "message": "online"
                            });
                        }
                    }, function (err) {
                        reject(err);
                    });
            });
        },
        "initBroker": function () {
            return new Promise(function (resolve, reject) {
                window.fetch("/initBroker")
                    .then(function (response) {
                        if (response.status === 500) {
                            return reject({
                                "status": response.status,
                                "message": "broker with problems"
                            });
                        } else {
                            return resolve({
                                "status": response.status,
                                "message": "broker online"
                            });
                        }
                    }, function (err) {
                        reject(err);
                    });
            });
        },
        "subscribeTopic": function (body) {
            return new Promise(function (resolve, reject) {
                fetch("/subscribeTopic", {
                    method: "POST",
                    body: body
                }).then(function (response) {
                    if (response.status === 500) {
                        return reject({
                            "status": response.status,
                            "message": "subscription error"
                        });
                    } else {
                        return resolve({
                            "status": response.status,
                            "message": "subscription ok"
                        });
                    }
                }, function (err) {
                    reject(err);
                });
            });

        }
    };

}(window));