import React from "react";
import {Link,browserHistory} from "react-router";


export default class FormList extends React.Component{
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
        {this.props.forms.map((form)=>{
          return(
          <div className="ListItem" key={form.id}>
            <Link to={"/forms/" + form.id}>{form.name}</Link>
            <span>{form.documentType}</span>
          </div>);
        })}
      </div>
    )
  }
}
