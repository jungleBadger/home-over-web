/**
 * Created by danielabrao on 11/2/16.
 */
(function () {
    "use strict";

    module.exports = function controlAuth (req, res, next) {
        var auth = {
                "login": 'admin',
                "password": 'dodoiadmin123'
            },
            b64auth = (req.headers.authorization || '').split(' ')[1] || '',
            x = new Buffer(b64auth, 'base64').toString().split(':'),
            login = x[0],
            password = x[1];

        if (!login || !password || login !== auth.login || password !== auth.password) {
            res.set('WWW-Authenticate', 'Basic realm="quickie"');
            return res.status(401).send('Credenciais inválidas.');
        } else {
            next();
        }
    };

}());