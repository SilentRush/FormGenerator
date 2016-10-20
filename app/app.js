import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import store from './store';
import router from './router';

const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()
app.listen(port)



const app = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>{router}</Provider>,
  app
);
