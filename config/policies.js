module.exports= {
    "/register": "reqResLog",
    "/login": "reqResLog",

    "/book": "reqResAuth",
    "/book/list": "reqResAuth",
    "/book/delete": "reqResAuth",
    "/room/available":"reqResAuth",


    
    "/room/create":  "reqResAuth",
    "/room/update": "reqResAuth",
    "/room/delete": "reqResAuth",
}