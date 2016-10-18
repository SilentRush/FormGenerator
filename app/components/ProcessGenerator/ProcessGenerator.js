import React from "react";



export default class ProcessGenerator extends React.Component{
  constructor(props){
    super(props);

    this.state = {
    };
  }
  componentDidMount(){

  }

  render(){
    return (
      <div className="row">
          <div className="small-12 medium-8 large-8 columns template" onDrop={this.onDrop} onDragOver={this.onDragOver} style={{minHeight:"500px"}}>
            <h2>Process Generator</h2>
          </div>
      </div>
    )
  }
}
