import React from "react";
import FormGenerator from "./FormGenerator/FormGenerator"

export default class Home extends React.Component{
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
        <img className="float-center" src="https://scontent-ort2-1.xx.fbcdn.net/v/t1.0-9/534425_381879625182914_318214566_n.jpg?oh=d668273197a5944f77061d8e83dd12b8&oe=58990EA6" />
      </div>
    )
  }
}
