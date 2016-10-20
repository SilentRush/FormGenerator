var express = require('express');
const path = require('path');
module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')
    const publicPath = express.static(path.join(__dirname, 'public'))

    app.use('/public', publicPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
