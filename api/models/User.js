/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

let bcrypt = require("bcrypt");
let Promise = require("bluebird");

module.exports = {

    attributes: {
        email: {
            type: "email",
            required: true,
            unique: true
        },
        password: {
            type: "string",
            minLength: 6,
            protected: true,
            required: true,
        },
        toJSON: function () {
            let obj = this.toObject();
            delete obj.password
        }
    },

    beforeCreate: (values, cb) => {
        bcrypt.hash(values.password, 10, (err, hash) => {
            if (err) {
                return cb(err);
            }
            values.password = hash;
            cb();
        });
    },

    comparePassword: (password, user) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, user.password, (err, match) => {
                if (err){
                    reject(err);
                }
                if (match) {
                    resolve(true);
                } else {
                    reject(err);
                }
            })
        });
    }
};

