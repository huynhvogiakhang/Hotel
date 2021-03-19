const requireDir= require("require-dir")
module.exports = {
    Sequelize: require('sequelize'),
    bcrypt: require('bcrypt'),
    uuid: require("node-uuid"),
    err: require("@hapi/boom"),
    code: require("./code"),
    lang: requireDir("./locale"),
    msg: require("./message"),
    JWT: require("jsonwebtoken"),
}