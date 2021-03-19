module.exports= {
    "POST /register": "UserHandler.register",
    "POST /login": "UserHandler.login",
    "POST /book": "UserHandler.booking",
    "GET /book/list":"UserHandler.userBooking",
    "POST /book/delete":"UserHandler.deleteBooking",

    "POST /room/create": "RoomHandler.createRoom",
    "POST /room/update": "RoomHandler.updateRoom",
    "POST /room/delete": "RoomHandler.deleteRoom",
}