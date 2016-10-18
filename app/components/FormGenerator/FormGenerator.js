import React from "react";
import {Link,browserHistory} from "react-router";
import FormList from "./FormList";



export default class FormGenerator extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      forms:[
        {"id":"dYHIQ","name":"Test","documentType":"TestDocument","fields":[[{"id":1,"name":"field1","label":"Field1: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1},{"id":2,"name":"field2","label":"Field2: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"text","row":1}],[{"id":6,"name":"field6","label":"Field6: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"date","row":2},{"id":7,"name":"field7","label":"Field7: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"datetime","row":2},{"id":8,"name":"field8","label":"Field8: ","style":"","colxs":12,"colsm":4,"colmd":3,"binding":"","onChange":"","type":"picklist","picklist":[""],"row":2}]]}
      ],
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
            <FormList forms={this.state.forms} />
          </div>
          <div className="small-12 medium-4 large-4 columns">
            <Link to="/form/create"><button className="button" type="button">Create Form</button></Link>
          </div>
        </div>
      </div>
    )
  }
}
