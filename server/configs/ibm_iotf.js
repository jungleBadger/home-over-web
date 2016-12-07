/**
 * Created by danielabrao on 9/21/16.
 */
(function () {
    "use strict";

    module.exports = function (localEnv, cloudEnv) {
        return {
            defaults: function buildObject () {
                return {
                    "org": localEnv.IOTF_ORG || cloudEnv.services["iotf-service"][0].credentials.org,
                    "id": "a-e8wjfx-hpcxylqxb8",
                    "type": "raspberry",
                    "auth-method": "token",
                    "auth-key": localEnv.IOTF_KEY || cloudEnv.services["iotf-service"][0].credentials.apiKey,
                    "auth-token": localEnv.IOTF_TOKEN || cloudEnv.services["iotf-service"][0].credentials.apiToken
                };
            },
            credentials: {
                apiKey: localEnv.IOTF_KEY || cloudEnv.services["iotf-service"][0].credentials.apiKey,
                apiToken: localEnv.IOTF_TOKEN || cloudEnv.services["iotf-service"][0].credentials.apiToken
            },
            exportedCredentials: (function buildCredential() {
                return function () {
                    return new Buffer([this.credentials.apiKey, ":", this.credentials.apiToken].join("")).toString("base64");
                };
            }())
        }
    };
}());