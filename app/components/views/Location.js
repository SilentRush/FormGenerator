import React from "react";
import { Link } from "react-router";

export default class Location extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        <ul className="weekdaysReservationView">
        <li>{this.props.location.name}</li>
        {this.props.selectedWeek.map((day) => {
          let x = this.props.getLocationReservationCount(day,this.props.location.id);
          let activeDate;
          if(day + "" + this.props.location.id == this.props.activeLocationDate)
            activeDate = "active";

          return <li key={day} className={activeDate} onClick={()=>{this.props.onChangeDate(day,this.props.location.id)}}>{x}</li>
        })}
        </ul>
      </div>
    )
  }
}
