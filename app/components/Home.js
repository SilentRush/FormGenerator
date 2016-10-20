import React from "react";
import FormGenerator from "./FormGenerator/FormGenerator";
import Codemirror from "react-codemirror";
require('codemirror/mode/javascript/javascript');
require('codemirror/addon/hint/javascript-hint');
import {showHint} from "codemirror/addon/hint/show-hint";

export default class Home extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    };

  }

  render(){
    return (
      <div></div>
    )
  }
}
