const reqResLog = require("./strategies/reqResLog"),
    sessionAuth = require("./strategies/sessionAuth"),
    hauth = require('hapi-auth-multiple-strategies')

async function exec(server) {
    let rRsLog = new reqResLog(),
        ssAuth = new sessionAuth()

    await server.register([
        {
            plugin: hauth
        },
        {
            name: 'log',
            pkg: require('./pkgs/reqResLog.json'),
            requirements: { hapi: '>=17.7.0' },
            register(server, options) { server.auth.scheme('log', rRsLog.RunLog) }
        },
        {
            name: 'auth',
            pkg: require('./pkgs/sessionAuth.json'),
            requirements: { hapi: '>=17.7.0' },
            register(server, options) { server.auth.scheme('auth', ssAuth.Authenicated) }
        },       
    ])
    server.auth.strategy('reqResLog', 'log')    
    server.auth.strategy('sessionAuth', 'auth')
    server.auth.strategy('reqResAuth', 'multiple-strategies', {
        strategies: ['reqResLog', 'sessionAuth']
    })
    return server
}

module.exports = exec