import React from "react";
import { Link } from "react-router";
import Location from "./Location";

export default class WeeklyReservationBreakdown extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <ul className="weekdaysReservation">
          <li>Location</li>
          <li>Su<br />{this.props.selectedWeek[0]}</li>
          <li>Mo<br />{this.props.selectedWeek[1]}</li>
          <li>Tu<br />{this.props.selectedWeek[2]}</li>
          <li>We<br />{this.props.selectedWeek[3]}</li>
          <li>Th<br />{this.props.selectedWeek[4]}</li>
          <li>Fr<br />{this.props.selectedWeek[5]}</li>
          <li>Sa<br />{this.props.selectedWeek[6]}</li>
        </ul>
        <div className="reservationsLocationList">
          {this.props.locations.map((location)=>{
            return (<Location key={location.id}
                      location={location}
                      onChangeDate={this.props.onChangeDate}
                      selectedWeek={this.props.selectedWeek}
                      getLocationReservationCount={this.props.getLocationReservationCount}
                      activeLocationDate={this.props.activeLocationDate}
                    />)
          })}
        </div>
        <ul className="weekdaysReservation">
          <li>Total Reservations: </li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[0])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[1])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[2])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[3])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[4])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[5])}</li>
          <li>{this.props.getReservationCountByDay(this.props.selectedWeek[6])}</li>
        </ul>
      </div>
    )
  }
}
