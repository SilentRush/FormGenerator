const React = require("react");
const ReactDOM = require("react-dom");
const Provider = require('react-redux');
const store = require('./store');
const router = require('./router');

const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()
app.listen(port)



const apps = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  apps
);
