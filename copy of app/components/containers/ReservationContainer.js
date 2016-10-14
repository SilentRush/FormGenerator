import React from "react";
import { connect } from 'react-redux';
import * as calendarApi from '../../api/calendar-api';
import Reservation from '../views/Reservation';
import {Entity} from 'draft-js';

export default class ReservationContainer extends React.Component{
  constructor(props){
    super(props);

    this.addReservation = () =>  {
      console.log(this);
    };
  }

  componentDidMount(){

  }

  render(){
    let totalarr = this.props.reservations.map((reservations) =>{
      return reservations.cost;
    });
    let total = totalarr.reduce((a,b)=>{return a+b},0);
    return (
      <div className="reservationsContainer">
        <div className="reservationsHeader">Reservations:<span style={{float:"right",cursor:"pointer"}} onClick={this.addReservation}><span className="glyphicon glyphicon-plus"></span> Add Reservation</span></div>
        <div className="reservationsList">
          {this.props.reservations.map((reservation) => {
            return <Reservation reservation={reservation} key={reservation.id} />
          })}
        </div>
        <div className="reservationsFooter">
          Total: ${total}
        </div>
      </div>
    )
  }
}
