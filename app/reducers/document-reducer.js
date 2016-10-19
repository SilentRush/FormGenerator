import * as types from '../actions/action-types';
import _ from 'lodash';

const initialState = {
  contacts: [
    {id:1,name:"Bob"},
    {id:2,name:"Sally"},
    {id:3,name:"Jane"}
  ],
  reservations: [
    {id:1,contactid:1,locationid:1,reservationDate:"2016-09-12",cost:25.22},
    {id:2,contactid:1,locationid:2,reservationDate:"2016-09-11",cost:175.12},
    {id:3,contactid:2,locationid:1,reservationDate:"2016-09-12",cost:65.12},
    {id:4,contactid:3,locationid:2,reservationDate:"2016-09-10",cost:575.12},
    {id:5,contactid:2,locationid:2,reservationDate:"2016-09-10",cost:43.52},
    {id:6,contactid:1,locationid:5,reservationDate:"2016-09-12",cost:225.52}
  ],
  locations: [
    {id:1,name:"Cottonwood"},
    {id:2,name:"Elm"},
    {id:3,name:"Willow"},
    {id:4,name:"Aspen"},
    {id:5,name:"Cedar"},
    {id:6,name:"Sunset 1"},
    {id:7,name:"Sunset 2"},
    {id:8,name:"Vehicle Site 1"},
    {id:9,name:"Vehicle Site 2"},
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
