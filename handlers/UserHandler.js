exports.register = async (req, h) => {
    req = new requestHelper.Request(req)
    let params = req.allParams  
    if (!params.fullname || !params.password) throw err[code[400]](lang[locale][msg[1001]])
    try{
      user = await Account.findOne({
        where: {
          fullName: params.fullname,
          active: 1
        },
      })
      if (user) return err[code[400]](lang[locale][msg[1003]])
      let insertData= {
        fullName: params.fullname,
        password: Account.hashPassword(params.password),
        role: params.role || "user"
      }
      user = await Account.create(insertData)
      jwtData={
        sid: uuid.v4(),
        uid: user.dataValues.id,
        role: user.dataValues.role
      }
      sign = await jwtHelper.createToken( jwtData, conf.ttl24h)
      console.log("xuong duoc day:",sign)
      return h.response({ message: lang[locale][msg[0]] })
      .header("JWT", sign)
      .code(200)
    } catch(error) {
      console.error(`[UserHandler.register] ERROR: ${error}`)
      throw err[code[500]](error.message)
    }
    
  }


exports.login = async (req, h) => {
    req = new requestHelper.Request(req)
    let params = req.allParams  
    if (!params.fullname || !params.password) throw err[code[400]](lang[locale][msg[1001]])
    try{      
      user = await Account.findOne({
        where: {
          fullName: params.fullname,
          active: 1,
        },
      })
      if (!user) return err[code[400]](lang[locale][msg[1006]])
      else if (!user.validPassword(params.password, user))
        return err[code[400]](lang[locale][msg[1004]])
      jwtData={
        sid: uuid.v4(),
        uid: user.dataValues.id,
        type: user.dataValues.role
      }
      sign = await jwtHelper.createToken( jwtData, conf.ttl24h)
      console.log(sign)
      return h.response({ message: lang[locale][msg[0]] })
      .header("JWT", sign)
      .code(200)
    } catch(error) {
      console.error(`[UserHandler.login] ERROR: ${error}`)
      throw err[code[500]](error.message)
    }
    
  }


  exports.booking = async (req, h) => {
    let params,quantityLeft,date,remainRoom
    req = new requestHelper.Request(req)
    params = req.allParams      
    userInfo= h.request.auth.credentials.sessionAuth
    if (!params.roomname || !params.day || !params.month) throw err[code[400]](lang[locale][msg[1001]])
    try{      
      room = await Room.findOne({
        where: {
          name: params.roomname,
          active:1
        }
      })
      if (!room) return err[code[400]](lang[locale][msg[1006]])
      remainRoom= await RoomStatus.findOne({
        where: {roomId: room.dataValues.id,day: parseInt(params.day),month: parseInt(params.month) }
      })
      
      if (remainRoom &&(remainRoom.dataValues.quantityLeft===0 || (remainRoom.dataValues.quantityLeft-params.quantity)<0)) throw err[code[400]](lang[locale][msg[1008]])
      await Booking.create({
        userId: userInfo.userId,
        roomId: room.dataValues.id,
        quantity: params.quantity || 1,
        day: params.day,
        month: params.month
      })
      if (params.quantity && remainRoom) {
        quantityLeft=remainRoom.dataValues.quantityLeft-parseInt(params.quantity)
        await RoomStatus.update({
          quantityLeft: quantityLeft
        },{where: {
          roomId: room.dataValues.id,
          day:parseInt(params.day),
          month: parseInt(params.month)
        }})
      }
        else {
          if (remainRoom) quantityLeft=--remainRoom.dataValues.quantityLeft
            else quantityLeft= --room.dataValues.quantity
          
          if (!remainRoom) 
          await RoomStatus.create({
            roomId: room.dataValues.id,
            day: params.day, 
            month: params.month,
            quantityLeft: quantityLeft
          })
          else 
          await RoomStatus.update({
            quantityLeft: quantityLeft
          },{where: {
            roomId: room.dataValues.id,
            day:parseInt(params.day),
            month: parseInt(params.month)
          }})
        }
      
        return h.response({ message: lang[locale][msg[0]] })
      .code(200)
    } catch(error) {
      console.error(`[UserHandler.Book] ERROR: ${error}`)
      throw err[code[500]](error.message)
    }
    
  }

  exports.userBooking = async (req, h) => {
    let params
    req = new requestHelper.Request(req)
    params = req.allParams      
    userInfo= h.request.auth.credentials.sessionAuth
    if ( !params.day || !params.month) throw err[code[400]](lang[locale][msg[1001]])
    try{      
      booking = await Booking.findAll({
        where: {
          userId: userInfo.userId,
          status:1
        },
      })
      if (!booking) return err[code[400]](lang[locale][msg[1006]])
      
    } catch(error) {
      console.error(`[UserHandler.Book] ERROR: ${error}`)
      throw err[code[500]](error.message)
    }
    
  }

  exports.deleteBooking = async (req, h) => {
    let params
    req = new requestHelper.Request(req)
    params = req.allParams      
    userInfo= h.request.auth.credentials.sessionAuth
    if ( !params.day || !params.month) throw err[code[400]](lang[locale][msg[1001]])
    try{      

      booking = await Booking.findOne({
        where: {
          userId: userInfo.userId,
          day: params.day,
          month: params.month,
          active: 1,
        },
      })
      if (!booking) return err[code[400]](lang[locale][msg[1008]])
      remainRoom= await RoomStatus.findOne({
        where: {roomId: booking.dataValues.roomId,day: parseInt(params.day),month: parseInt(params.month) }
      })
    } catch(error) {
      console.error(`[UserHandler.Book] ERROR: ${error}`)
      throw err[code[500]](error.message)
    }
    
  }
  