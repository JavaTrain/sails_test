let jwt = require('jsonwebtoken');
let jwtSecret = sails.config.secrets.jwtSecret;

module.exports = {
    issue: (payload) => {
        return jwt.sign(payload, jwtSecret, {expiresIn: 60 * 60});
    },

    verify: (token, callback) => {
        return jwt.verify(token, jwtSecret, callback);
    }
};