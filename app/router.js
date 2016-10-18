import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import DocumentGenerator from "./components/DocumentGenerator/DocumentGenerator";
import FormGenerator from "./components/FormGenerator/FormGenerator";
import FormPage from "./components/FormGenerator/FormPage";
import CreateForm from "./components/FormGenerator/CreateForm";
import ProcessGenerator from "./components/ProcessGenerator/ProcessGenerator";

//Layouts
import Layout from "./components/layouts/Layout";
import Home from "./components/Home";


export default (
  <Router history={browserHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="documents" component={DocumentGenerator}>

      </Route>
      <Route path="forms" component={FormGenerator}></Route>
      <Route path="/forms/:formid" component={FormPage}></Route>
      <Route path="/form/create" component={CreateForm}></Route>
      <Route path="processes" component={ProcessGenerator}></Route>
    </Route>
  </Router>
);
