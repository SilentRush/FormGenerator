var express = require('express');
const path = require('path');
module.exports = {
  app: function () {
    const app = express()
    const indexPath = path.join(__dirname, 'index.html')

    app.use('/public', indexPath)
    app.get('/', function (_, res) { res.sendFile(indexPath) })

    return app
  }
}
