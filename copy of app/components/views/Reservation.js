import React from "react";
import { Link } from "react-router";

export default class Reservation extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    console.log(this.props);
    return (
      <div>
        Contact Id: {this.props.reservation.contactid}<br />
        Reservation Cost: ${this.props.reservation.cost}
      </div>
    )
  }
}
