import React from "react";
import {Link,browserHistory} from "react-router";
import ParseFields from "./ParseFields";
import SelectedField from "./SelectedField";
import Toolbar from "./Toolbar";



export default class FormGenerator extends React.Component{
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
          <div className="small-12 medium-12 large-12 columns">
            <Link to="/forms/create"><button className="button" type="button">Create Form</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
