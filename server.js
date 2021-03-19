const Hapi = require('@hapi/hapi'),
    Middle = require("./middleware/register"),
    Intergration = require("./config/intergrate"),
    _ = require("./config/globals")
let server;
let init = async () => {
    for (var k in _) global[k] = _[k]
    server = Hapi.server(
        {
            port: process.env.PORT || 3000,
            host: "0.0.0.0",
            state: {
                strictHeader: true
            },
            routes: {
                timeout: {
                    server: 1000 * 30,
                }
            }
        }
    )
    server = await Middle(server)
    server = await Intergration(server)
    await server.start()
    console.log('\x1b[32m', `Server running on ${process.env.NODE_ENV} ${server.info.uri}`, '\x1b[37m');
    console.log('\x1b[32m',
        `
   _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _     
  |                                                                                 |
  |        *        ******    ******   * * * *   *       *  *       *  * * * * * *  |
  |      *   *     *         *        *       *  *       *  * *     *       *       |
  |     * * * *   *         *         *       *  *       *  *   *   *       *       |
  |    *       *   *         *        *       *  *       *  *     * *       *       |
  |   *         *   ******    ******   * * * *    * * * *   *       *       *       |
  |_ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _ _| 
  `, '\x1b[37m')
}
init()
module.exports = server