import React from "react";
import { Link } from "react-router";

export default class ContactSearch extends React.Component{
  constructor(props){
    super(props);
    this.addContact = (e) => {
      e.preventDefault();
      this.props.addContact(this.refs.contact.value);
    }
  }
  render(){

    return (
      <div>
        <h3>Contacts</h3>
        <form onSubmit={this.addContact}>
          <div className="input-group">
            <input type="text" ref="contact" className="form-control" />
            <span className="input-group-btn">
              <input type="submit" value="submit" className="btn btn-default" />
            </span>

          </div>
        </form>
      </div>
    )
  }
}
