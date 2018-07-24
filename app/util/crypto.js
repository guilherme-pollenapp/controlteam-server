var crypto = require("crypto-js");

module.exports = (app) => {
    return () => {
        this.pass = (pass) => {
            return crypto.SHA512(pass).toString();
        }

        return this;
    }
}