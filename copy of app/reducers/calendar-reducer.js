import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  contacts: [
    {id:1,name:"Bob"},
    {id:2,name:"Sally"},
    {id:3,name:"Jane"}
  ],
  reservations: [
    {id:1,contactid:1,locationid:1,reservationDate:"2016-08-08",cost:25.22},
    {id:2,contactid:1,locationid:2,reservationDate:"2016-08-10",cost:175.12},
    {id:3,contactid:2,locationid:2,reservationDate:"2016-08-09",cost:65.12},
    {id:4,contactid:3,locationid:2,reservationDate:"2016-08-10",cost:575.12},
    {id:5,contactid:2,locationid:2,reservationDate:"2016-08-10",cost:43.52},
    {id:6,contactid:1,locationid:5,reservationDate:"2016-08-10",cost:225.52}
  ],
  locations: [
    {id:1,name:"Brokeback Ridge"},
    {id:2,name:"Sundar's Palace of Love"},
    {id:3,name:"Someplace"},
    {id:4,name:"Tent Site #1"},
    {id:5,name:"Whispering Peak"},
    {id:6,name:"Mountain View"},
    {id:7,name:"Somewhere"},
    {id:8,name:"Prince of Indonesia's Pleasure Palace"},
  ]
};

const calenderReducer = function(state = initialState, action) {
  switch(action.type) {

    case types.GET_CALENDARS_SUCCESS:
      return Object.assign({}, state, { calenders: action.calenders });

    case types.GET_CALENDAR_SUCCESS:
      return Object.assign({}, state, { calender: action.calender });

  }

  return state;

}

export default calenderReducer;
