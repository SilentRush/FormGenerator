import axios from 'axios';
import store from '../store';
import instance from './connection-config'
import { getCalendarsSuccess, getCalendarSuccess } from '../actions/calendar-actions';
import {encodeObjectToUriString} from '../components/Utility/AuthenticationWrapper'

 const API_ROOT = 'http://api.twilkislinux.sssworld-local.com/';

export function getContact(contactid) {
  let calendarStore = store.getState().calendarState;
  let contact = calendarStore.contacts.filter((contact)=>{
      return contact.id == contactid
  });
  return contact[0];
}

export function getReservations(year,month,days){
  let calendarStore = store.getState().calendarState;
  let reservations = calendarStore.reservations.filter((reservation)=>{
      let resArr = reservation.reservationDate.split("-");
      let resyear = resArr[0];
      let resmonth = resArr[1];
      let resday = resArr[2];
      return (resyear == year && resmonth == (month + 1) && days.indexOf(parseInt(resday)) > -1)
  });
  return reservations;
}

export function getReservationsByLocationDay(year,month,day,locationid){
  let calendarStore = store.getState().calendarState;
  let reservations = calendarStore.reservations.filter((reservation)=>{
      let resArr = reservation.reservationDate.split("-");
      let resyear = resArr[0];
      let resmonth = resArr[1];
      let resday = resArr[2];
      return (resyear == year && resmonth == (month + 1) && resday == day &&  reservation.locationid == locationid)
  });
  return reservations;
}

export function getReservationsByLocationDayCount(year,month,day,locationid){
  let calendarStore = store.getState().calendarState;
  let reservations = calendarStore.reservations.filter((reservation)=>{
      let resArr = reservation.reservationDate.split("-");
      let resyear = resArr[0];
      let resmonth = resArr[1];
      let resday = resArr[2];
      return (resyear == year && resmonth == (month + 1) && resday == day && reservation.locationid == locationid)
  });
  return reservations.length;
}

export function getReservationsByDayCount(year,month,day){
  let calendarStore = store.getState().calendarState;
  let reservations = calendarStore.reservations.filter((reservation)=>{
      let resArr = reservation.reservationDate.split("-");
      let resyear = resArr[0];
      let resmonth = resArr[1];
      let resday = resArr[2];
      return (resyear == year && resmonth == (month + 1) && resday == day)
  });
  return reservations.length;
}
