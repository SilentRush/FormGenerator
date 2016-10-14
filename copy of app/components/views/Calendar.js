import React from "react";
import { Link } from "react-router";

export default class Calendar extends React.Component{
  constructor(props){
    super(props);
  }

  getMonthText(month){
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
  }

  getLastMonthsDays(){
    let firstOfMonth = new Date(this.props.year, this.props.month, 1);
    let numOfLastMonthDays = firstOfMonth.getDay();
    let lastday = new Date(this.props.year, this.props.month, 0);
    var days = [];
    for(var i = 0; i < numOfLastMonthDays; i++){
      let day = new Date(this.props.year, this.props.month - 1, lastday.getDate() - (numOfLastMonthDays - i));
      console.log(day);
      days.push(<li key={day.getDate()}>{day.getDate()}</li>);
    }
    return <span className="lastMonthDays" key={this.getMonthText(this.props.month)-1}>{days}</span>;
  }

  getThisMonthsDays(){
    let firstOfMonth = new Date(this.props.year, this.props.month + 1, 1);
    let lastOfMonth = new Date(this.props.year, this.props.month + 1, 0);
    let numOfDays = lastOfMonth.getDate();
    var days = [];
    for(var i = 0; i < numOfDays; i++){
      let d = i;
      let activeDate;
      if(d + 1 == this.props.day)
        activeDate = "active";
      days.push(<li className={activeDate} key={i+1} onClick={() => this.props.changeDay(d+1)}>{(d+1)}</li>);
    }
    return <span className="thisMonthDays" key={this.getMonthText(this.props.month)}>{days}</span>;
  }

  render(){
    let monthText = this.getMonthText(this.props.month);
    let lastMonthsDays = this.getLastMonthsDays();
    let thisMonthsDays = this.getThisMonthsDays();
    return (
      <div>
        <div className="month">
          <ul>
            <li className="prev" onClick={this.props.prevMonth}>&#10094;</li>
            <li className="next" onClick={this.props.nextMonth}>&#10095;</li>
            <li>
              {monthText}<br />
            </li>
            <li className="prev" onClick={this.props.prevYear}>&#10094;</li>
            <li className="next" onClick={this.props.nextYear}>&#10095;</li>
            <li>
              <span style={{fontSize:"18px"}}>{this.props.year}</span>
            </li>
          </ul>
        </div>
        <ul className="weekdays">
          <li>Su</li>
          <li>Mo</li>
          <li>Tu</li>
          <li>We</li>
          <li>Th</li>
          <li>Fr</li>
          <li>Sa</li>
        </ul>
        <ul className="days">
          {lastMonthsDays}
          {thisMonthsDays}
        </ul>
      </div>
    )
  }
}
