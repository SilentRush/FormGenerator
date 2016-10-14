import React from "react";
import { Link } from "react-router";

export default class Contact extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (
      <div>
        {this.props.contact.name}
      </div>
    )
  }
}
