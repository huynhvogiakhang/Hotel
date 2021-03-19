'use strict'
const request = require("request")
class Request {
    constructor(req, params = {}, schema = {}, action = null) {
        this.query = req.query
        this.payload = req.payload
        this.path = req.params
        this.params = params
        this.action = action
        this.schema = schema
        this.result = null
    }
    get allParams() {
        return this.SetParams()
    }
    SetParams() {
        if (this.query) for (var k in this.query) this.params[k] = this.query[k]
        if (this.payload) for (var k in this.payload) if (k != "code" && k != "phone") this.params[k] = this.payload[k]
        if (this.path) for (var k in this.path) this.params[k] = this.path[k]
        return this.params
    }
    
}

module.exports = {
    Request: Request
    // something else
}