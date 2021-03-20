module.exports={
    ttl24h: 24 * 60 * 60,
    JWT_KEY: "ea86749a-cf64-47bc-81b1-85d97b8b3d57",
    mysql: {
        database: 'hotel',
        user: 'root',
        password: '123456',
        options: {
          host: '127.0.0.1',
          dialect: 'mysql',
          port: 3306,
          pool: {
            max: 100,
            min: 0,
            idle: 10000
          }
        }
      }, 
}