import * as types from '../actions/action-types';

export function getCalendarsSuccess(calendars) {
  return {
    type: types.GET_CALENDARS_SUCCESS,
    tickets
  };
}

export function getCalendarSuccess(ticket) {
  return {
    type: types.GET_CALENDAR_SUCCESS,
    ticket
  };
}
