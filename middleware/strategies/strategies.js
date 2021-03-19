/* Abtract Strategies 
    * Creditials 
    * Log
    * 
    * 
    * 
    * 
    * 
    * 
    * Lists
*/
class Strategies {
    constructor(log = ""){
        this.credentials = {
            valid: false,
            credentials: {}
        }
        this.log        = log
    }
    get GetCredentials(){
        return this.credentials
    }
    get GetLog(){
        return this.log
    }
}
module.exports = Strategies