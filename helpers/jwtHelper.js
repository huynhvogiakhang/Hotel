module.exports = {
    createToken: (payload, ttl) => {
      let token  ;
      return new Promise((resolve, reject) => {
        JWT.sign(payload, conf.JWT_KEY, { expiresIn: ttl }, (err, token )=> {
          if (err) return reject(err)
          else return resolve(token)
        })
        
      })
    },
    verify: (token, secret) => {
      return new Promise((resolve, reject) => {
  
        JWT.verify(token, secret, function (err, decoded) {
          if (err) return reject(err)
          else return resolve(decoded)
        });
      })
    },
   
  }