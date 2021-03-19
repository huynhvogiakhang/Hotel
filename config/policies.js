module.exports= {
    "/register": "reqResLog",
    "/login": "reqResLog",

    "/book": "reqResAuth",
    "/book/list": "reqResAuth",
    "/book/delete": "reqResAuth",

    "/room/create":  "reqResAuth",
    "/room/update": "reqResAuth",
    "/room/delete": "reqResAuth",
}