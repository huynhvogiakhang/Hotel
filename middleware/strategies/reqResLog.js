const uuid = require('node-uuid'),
    Strategies = require("./strategies")
class ReqResLog extends Strategies {
    constructor(request, apiKey = "", start = new Date(), reqId = uuid.v4()) {
        super()
        this.apiKey = apiKey
        this.request = request
        this.start = start
        this.reqId = reqId
        this.takeTime = 0
    }
    get ReqLog() {
        return this.SetReqLog()
    }
    get ResLog() {
        return this.SetResLog()
    }
    get RunLog() {
        return this.Exec()
    }
    SetReqLog() {
        let dataBody, message = {}, dataModel, dataAction, statusError = "success", messError = "", decode
        return new Promise(async (resolve, reject) => {
            dataBody = this.request
            try {
                if (this.request.query.password || this.request.query.newPassword) {
                    delete this.request.query.password
                    delete this.request.query.newPassword
                }
                if (this.request.payload && (this.request.payload.password || this.request.payload.newPassword)) {
                    delete this.request.payload.password
                    delete this.request.payload.newPassword
                }
                this.log = {}
                this.reqTotal = {}
                this.reqTotal = {
                    reqId: this.reqId,
                    method: this.request.method.toUpperCase(),
                    path: this.request.route.path
                }
                this.log = {
                    REQUEST: this.reqTotal,
                    PARAMS: this.request.query,
                    BODY: this.request.payload,
                    HEADERS: this.request.headers,
                    RESPONSE: this.request.response.source || "",
                    DURATION: this.takeTime,
                    statusCode: this.request.response.statusCode
                }                                    
                // }
                // }
                return resolve(this.GetLog)
            } catch (error) {
                console.log("reqResLog ERROR: DATA: ", dataBody.route.path, "DATA REQUEST:", JSON.stringify(message), "ERROR:", error)
            }

        })
    }
    SetResLog() {
        this.takeTime = new Date() - this.start
        this.log = ""
        this.log += `[RESPONSE - ${this.reqId}] ${this.request.method.toUpperCase()} ${this.request.route.path} - HEADER - ${JSON.stringify(this.request.headers)} - BODY - ${JSON.stringify(this.request.response.source)} - DURATION - ${this.takeTime}\n`

        return this.GetLog
    }
    Exec() {
        let that, req, ReqLog, api_url;
        return function (server, options) {
            server.events.on('response', async function (req) {
                try {
                    if (req.path != "/health_check") {
                        ReqLog = await that.ReqLog
                        that.request = req
                        api_url = req.route.path.replace(/\//g, '')
                        console.log(JSON.stringify(ReqLog))                    
                    }
                } catch (e) {
                    console.log(e)
                }
            })
            const scheme = {
                authenticate: async function (request, h) {
                    that = new ReqResLog(request)
                    let locale = request.headers["accept-language"],
                        ip = request.headers["x-forwarded-for"] || null
                    global.locale = locale                    
                    if (typeof (locale) == "undefined" || !locale || !multiLanguage.includes(locale)) global.locale = "vi"
                    return h.authenticated(that.GetCredentials)
                }
            }
            return scheme
        }
    }
}

module.exports = ReqResLog