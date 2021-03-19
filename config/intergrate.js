const r = require("./routes"),
    reg = require("./policies"),
    requireDir = require("require-dir"),
    sequelized = requireDir("../sequelized")
hh = {
    handlers: requireDir("../handlers"),
    helpers: requireDir("../helpers")
},
    m = requireDir("../models"),
    conf = require(`./env/${process.env.NODE_ENV || "local"}`)

let ctx, obj = {}, routes = []

 async function intergate(server) {
    // setup db
    sequelize = new Sequelize(conf.mysql.database, conf.mysql.user, conf.mysql.password, conf.mysql.options)
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
    // Untilized global
    global.conf = conf
    global.$ = Sequelize.Op

    // Utilized mapping
    for (var km in m) { global[km] = m[km](); obj[km] = global[km] }
    for (var k in hh) for (var kk in hh[k]) global[kk] = hh[k][kk]


    // Init cache, model
    sequelized.init(obj)

    // Untilized routing
    for (var k in r) {
        ctx = {}
        rt = k.split(" ")
        ctx.method = rt[0]
        ctx.path = rt[1]
        r[k] = r[k].split(".")
        ctx.handler = hh.handlers[r[k][0]][r[k][1]]
        if (reg[ctx.path]) {
            if (r[k][1] != "upload") {
                ctx.config = {
                    auth: { strategies: [reg[ctx.path]] },
                    cors: {
                        origin: ["*"],
                        headers: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type", "CORELATION_ID"],
                        credentials: true,
                        additionalHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID'],
                        additionalExposedHeaders: ['access-control-allow-headers', 'Access-Control-Allow-Origin, Access-Control-Allow-Headers, Origin, X-Requested-With, Content-Type, CORRELATION_ID', 'x-fim-gtoken', 'x-fim-atoken', 'x-fim-rtoken']
                    }
                }
            } else {
                ctx.options = {
                    auth: { strategies: [reg[ctx.path]] },
                    payload: {
                        maxBytes: 1024 * 1024 * 3,
                        output: 'stream'
                    }
                }
            }
        }
        routes.push(ctx)
    }
    server.route(routes)

    // Executed
    return Promise.resolve(server)
}

module.exports = intergate