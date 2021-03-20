const jwtHelper = require("../../helpers/jwtHelper")
const Strategies = require("./strategies")
class SessionAuth extends Strategies {
    get Authenicated() {
        return this.setAuthenicated(this.GetCredentials)
    }
    setAuthenicated(Credentials) {
        return function (server, options) {
            const scheme = {
                authenticate: async (request, h) => {                    
                    Credentials.valid = false
                    try{
                        if (!request.headers.jwt) return h.unauthenticated(err[code[405]](msg[1000]), Credentials)                          
                        let jwtData= await jwtHelper.verify(request.headers.jwt,conf.JWT_KEY)
                        console.log(jwtData)
                        let cre= {
                            userId: jwtData.uid,
                            role: jwtData.role,
                        }
                        Credentials.credentials = cre
                        return h.authenticated(Credentials)    
                    } catch(error) {
                        console.log(error)
                        return h.unauthenticated(err[code[405]](msg[1000]), Credentials)
                       
                    }
                    
                }
            }
            return scheme
        }
    }
}

module.exports = SessionAuth