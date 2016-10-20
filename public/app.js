const Server = require('../app/server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()
app.listen(port)
