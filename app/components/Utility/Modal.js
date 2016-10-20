import React from "react";
import {Link,browserHistory} from "react-router";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Modal extends React.Component{
    constructor(props){
      super(props);

      this.state = {
      };
    }

    componentDidMount(){

    }

    componentWillReceiveProps(props){
    }


    render(){
        let margin = -(this.props.width) / 2;
        margin = "auto " + margin + "px";
        if(this.props.isOpen){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div className="modal-overlay" style={{display:"block"}} onClick={(e)=>{if(e.target.className =="modal-overlay") this.props.closeModal();}}>
                  <div className="modal" id={this.props.id} style={{width:this.props.width + "px",margin:margin}}>
                    {this.props.children}
                  </div>
                </div>
              </ReactCSSTransitionGroup>
            );
        } else {
            return (<ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            </ReactCSSTransitionGroup>);
        }
    }
}
