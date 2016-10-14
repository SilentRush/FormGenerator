import React from "react";
import { connect } from 'react-redux';
import * as calendarApi from '../../api/calendar-api';
import Contact from '../views/Contact';
import ContactSearch from '../views/ContactSearch';
import {Entity} from 'draft-js';

export default class ContactContainer extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <ContactSearch addContact={this.props.addContact} />
        {this.props.contacts.map((contact) => {
          return <Contact contact={contact} key={contact.id} />
        })}
      </div>
    )
  }
}
