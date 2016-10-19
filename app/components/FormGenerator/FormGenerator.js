import React from "react";
import { connect } from 'react-redux';
import {Link,browserHistory} from "react-router";
import FormList from "./FormList";



class FormGenerator extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    };

  }
  componentDidMount(){

  }

  render(){
    return (
      <div>
        <div className="row">
          <div className="small-12 medium-8 large-8 columns">
            <h3>Form List</h3>
          </div>
          <div className="small-12 medium-4 large-4 columns">
            <Link to="/form/create"><button className="button float-right" type="button">Create Form</button></Link>
          </div>
        </div>
        <div className="row">
          <div className="small-12 columns">
            <FormList forms={this.props.forms} />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
    forms: store.formState.forms
  };
};

export default connect(mapStateToProps)(FormGenerator);
