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
      <ul>
        {this.props.forms.map((form)=>{
          return(
          <li className="ListItem" key={form.id}>
            <Link to={"/forms/" + form.id}>{form.name}
            <span className="float-right">{form.documentType}&nbsp; <i className="fa fa-arrow-circle-right"></i></span></Link>
          </li>);
        })}
      </ul>
    )
  }
}
