exports.createRoom = async (req, h) => {
    let params,roomData
    req = new requestHelper.Request(req)
    userInfo= h.request.auth.credentials.sessionAuth
    params = req.allParams  
    if (!params.name || !params.quantity || !params.price || !params.type) throw err[code[400]](lang[locale][msg[1001]])    
    if (userInfo.role !== "admin") throw err[code[400]](lang[locale][msg[1000]])

    try{
      room = await Room.findOne({
        where: {
          name: params.name,
          active: 1
        },
      })
      if (room) return err[code[400]](lang[locale][msg[1003]])
      roomData={
          name: params.name,
          quantity: params.quantity,
          type: params.type,
          price: params.price,
          description: params.description || null
      }
      await Room.create(roomData)
      return h.response({ message: lang[locale][msg[0]] })
      .code(200)
    } catch(error) {
        console.error(`[RoomHandler.createRoom] ERROR: ${error}`)
        throw err[code[500]](error.message)
    }
    
}

exports.updateRoom = async (req, h) => {
    let params,roomData
    req = new requestHelper.Request(req)
    userInfo= h.request.auth.credentials.sessionAuth
    params = req.allParams  
    if (!params.name ) throw err[code[400]](lang[locale][msg[1001]])
    if (userInfo.role !== "admin") throw err[code[400]](lang[locale][msg[1000]])

    try{
      room = await Room.findOne({
        where: {
          name: params.name,
          active:1
        },
      })
      if (!room) return err[code[400]](lang[locale][msg[1008]])
      roomData={
          name: params.name,
          quantity: params.quantity || null,
          type: params.type || null,
          price: params.price || null ,
          description: params.description || null,
          active: 1
      }
      room= await Room.update(roomData, {where:{name:params.name, active:1}})
      return h.response({ message: lang[locale][msg[0]] })
      .code(200)
    } catch(error) {
        console.error(`[RoomHandler.updateRoom] ERROR: ${error}`)
        throw err[code[500]](error.message)
    }
    
}


exports.deleteRoom = async (req, h) => {
    let params
    req = new requestHelper.Request(req)
    userInfo= h.request.auth.credentials.sessionAuth
    params = req.allParams  
    if (params.error) throw err[code[500]](lang[locale][msg[1002]])
    if (!params.name ) throw err[code[400]](lang[locale][msg[1001]])
    if (userInfo.role !== "admin") throw err[code[400]](lang[locale][msg[1000]])

    try{
      room = await Room.findOne({
        where: {
          name: params.name,
          active:1 
        },
      })
      if (!room) return err[code[400]](lang[locale][msg[1008]])      
      room= await Room.update({active:0 }, {where:{name:params.name}})
      return h.response({ message: lang[locale][msg[0]] })
      .code(200)
    } catch(error) {
        console.error(`[RoomHandler.deleteRoom] ERROR: ${error}`)
        throw err[code[500]](error.message)
    }
    
}


