import React from "react";
import {Link,browserHistory} from "react-router";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


export default class Modal extends React.Component{
    constructor(props){
      super(props);

      this.state = {
      };
    }
    render(){
        if(this.props.isOpen){
            return (
              <ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                <div className="modal">
                  {this.props.children}
                </div>
              </ReactCSSTransitionGroup>
            );
        } else {
            return (<ReactCSSTransitionGroup transitionName={this.props.transitionName} transitionEnterTimeout={500} transitionLeaveTimeout={300}>
            </ReactCSSTransitionGroup>);
        }
    }
}
