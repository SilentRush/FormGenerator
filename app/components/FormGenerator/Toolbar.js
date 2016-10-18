import React from "react";
export default class Toolbar extends React.Component {
  constructor(props){
    super(props);
    this.state = {isActiveIndex:null};
    this.getActive = (index) => {
      if(index == this.state.isActiveIndex)
        return "is-active";
    };
    this.updateActive = (index) => {
      if(index == this.state.isActiveIndex)
        this.setState({isActiveIndex:null});
      else
        this.setState({isActiveIndex:index});
    };
  }

  render(){
    var toolbarBtnClasses = "button hollow toolbarBtn";
    return (
      <div className="small-12 medium-12 large-12 columns">
        <ul className="accordion">
          <li className={"accordion-item " + this.getActive(0)}  onClick={()=>{this.updateActive(0)}}>
            <a href="#" className="accordion-title">Input Controls</a>
            <div className="accordion-content accordion-contentCustom">
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag} data-type="text" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Text Input</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag} data-type="textarea" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Text Area</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag} data-type="picklist" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Picklist</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="date" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Date Input</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="datetime" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Datetime Input</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="number" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Number Input</button></div>
              <div draggable="true" className="small-6 medium-4 large-4 columns" onDragStart={this.props.onDrag}  data-type="checkbox" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Checkbox Input</button></div>
            </div>
          </li>
          <li className={"accordion-item " + this.getActive(1)} onClick={()=>{this.updateActive(1)}}>
            <a href="#" className="accordion-title">Media Controls</a>
            <div className="accordion-content accordion-contentCustom" data-tab-content>
              <div draggable="true" className="small-6 medium -4 large-4 columns" onDragStart={this.props.onDrag}  data-type="image" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Image</button></div>
            </div>
          </li>
          <li className={"accordion-item " + this.getActive(2)} onClick={()=>{this.updateActive(2)}}>
            <a href="#" className="accordion-title">Form Controls</a>
            <div className="accordion-content accordion-contentCustom" data-tab-content>
              <div draggable="true" className="small-6 medium -4 large-4 columns" onDragStart={this.props.onDrag}  data-type="spacer" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Spacer</button></div>
              <div draggable="true" className="small-6 medium -4 large-4 columns" onDragStart={this.props.onDrag}  data-type="linebreak" style={{paddingLeft: "0.3rem",paddingRight: "0.3rem"}}><button type="button" className={toolbarBtnClasses}>Line Break</button></div>
            </div>
          </li>
        </ul>
        <div>
          <button type="text" className="button primary" onClick={()=>{this.props.addRow()}}>Add Row</button>
          <button type="text" className="button alert" onClick={()=>{this.props.removeRow()}}>Remove Row</button>
        </div>
      </div>
    );
  }
};
