import React from "react";
import { connect } from 'react-redux';
import * as calendarApi from '../../api/calendar-api';
import Calendar from "../views/Calendar";
import ContactContainer from "./ContactContainer";
import ReservationContainer from "./ReservationContainer";
import WeeklyReservationBreakdown from "../views/WeeklyReservationBreakdown"
import {Entity} from 'draft-js';

class CalendarContainer extends React.Component{
  constructor(props){
    super(props);
    var currDate = new Date();
    this.state = {
      view:"calendar",
      toggleBtnLabel:"Show Reservation View",
      month:currDate.getMonth(),
      day:currDate.getDate(),
      year:currDate.getFullYear(),
      selectedWeek:[1,2,3,4,5,6,7],
      contacts:[],
      reservations:[],
      selectedReservations:[],
      locations:[]
    }
    this.calculateWeek = (year,month,day) => {
      let selectedDay = new Date(year,month,day);
      let daysToEndOfWeek = 7 - selectedDay.getDay();
      let days = [];
      for(var i = (selectedDay.getDate() - selectedDay.getDay()); i < (selectedDay.getDate() + daysToEndOfWeek); i++)
        days.push(i);
      return days;
    }
    this.calculateWeek(this.state.year,this.state.month,this.state.day);

    this.changeMonth = (month) => {
      this.setState({month:month});
    }
    this.changeDay = (day) => {
      this.setState({day:day});
    }
    this.changeYear = (year) => {
      this.setState({year:year});
    }
    this.prevYear = () => {
      this.setState({year: this.state.year - 1});
    }
    this.nextYear = () => {
      this.setState({year: this.state.year + 1});
    }
    this.prevMonth = () => {
      if(this.state.month == 0){
        this.setState({month:11});
      }
      else{
        this.setState({month: this.state.month - 1});
      }

    }
    this.nextMonth = () => {
      if(this.state.month == 11){
        this.setState({month:0});
      }
      else{
        this.setState({month: this.state.month + 1});
      }
    }

    this.addContact = (contactid) => {
      let contacts = this.state.contacts;
      let contact = calendarApi.getContact(contactid);
      if(contacts.indexOf(contact) == -1)
        contacts.push(contact);
      this.setState({contacts:contacts});
    };

    this.onChangeDate = (day, locationid) => {
      let reservations = calendarApi.getReservationsByLocationDay(this.state.year,this.state.month,day,locationid);
      this.setState({selectedReservations:reservations,activeLocationDate:day + "" + locationid});
    }

    this.getLocationReservationCount = (day, locationid) => {
      let count = calendarApi.getReservationsByLocationDayCount(this.state.year,this.state.month,day,locationid);
      return count;
    }

    this.getReservationCountByDay = (day) => {
      let count = calendarApi.getReservationsByDayCount(this.state.year,this.state.month,day);
      return count;
    }

    this.toggleView = () => {
      if(this.state.view == "calendar"){
        this.setState({view:"reservation",toggleBtnLabel:"Show Calendar View"});
      }else{
        this.setState({view:"calendar",toggleBtnLabel:"Show Reservation View"})
      }
      let days = this.calculateWeek(this.state.year,this.state.month,this.state.day);
      let reservations = calendarApi.getReservations(this.state.year, this.state.month, days);
      this.setState({selectedWeek:days,reservations:reservations,selectedReservations:[],activeLocationDate:""});
    }

  }

  componentDidMount(){
  }

  render(){
    if(this.state.view == "calendar"){
      this.view = <div className="row">
        <div className="medium-12 small-12 large-12">
          <Calendar
            month={this.state.month}
            day={this.state.day}
            year={this.state.year}
            changeMonth={this.changeMonth}
            changeDay={this.changeDay}
            changeYear={this.changeYear}
            prevYear={this.prevYear}
            nextYear={this.nextYear}
            prevMonth={this.prevMonth}
            nextMonth={this.nextMonth}
          />
        </div>
      </div>
    }else if(this.state.view == "reservation"){
      this.view = <div>
        <div className="row">
          <div className="medium-12 small-12 large-12">
            <ContactContainer
              addContact={this.addContact}
              contacts={this.state.contacts}
             />
          </div>
        </div>
        <div className="row">
          <div className="medium-12 small-12 large-12">
            <WeeklyReservationBreakdown
              locations={this.props.locations}
              selectedWeek={this.state.selectedWeek}
              onChangeDate={this.onChangeDate}
              getLocationReservationCount={this.getLocationReservationCount}
              getReservationCountByDay={this.getReservationCountByDay}
              activeLocationDate={this.state.activeLocationDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="medium-12 small-12 large-12">
            <ReservationContainer
              reservations={this.state.selectedReservations}
              contacts={this.state.contacts}
            />
          </div>
        </div>
      </div>
    }
    return (
      <div>
        <input type="button" className="btn btn-default" value={this.state.toggleBtnLabel} onClick={this.toggleView} />
        {this.view}
      </div>
    )
  }
}


const mapStateToProps = function(store) {
  return {
      locations: store.calendarState.locations,
      reservations: store.calendarState.reservations
  };
};

export default connect(mapStateToProps)(CalendarContainer);
