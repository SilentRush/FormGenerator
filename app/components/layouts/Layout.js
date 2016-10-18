import React from "react";
import {Link, browserHistory} from "react-router";
import { connect } from 'react-redux';

import Nav from "./Nav";
import Footer from "./Footer";


class Layout extends React.Component{
  constructor(props){
    super(props);
  }

  componentDidMount(){
    let options = {};
    var elem = new Foundation.OffCanvas($('#offCanvas'), options);
  }

  render(){
    const { location } = this.props;
    const containerStyle = {marginTop: "60px"};
    return (
      <div>

        <div className="off-canvas-wrapper">
          <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
            <div className="off-canvas position-left" id="offCanvas" data-off-canvas>
              <Nav location={location} />
            </div>
            <div className="off-canvas-content" data-off-canvas-content>
              <div className="title-bar">
                <div className="title-bar-left">
                  <button className="menu-icon" type="button" data-toggle="offCanvas"></button>
                  <span className="title-bar-title">MENU</span>
                </div>
              </div>
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = function(store) {
  return {
  };
};

export default connect(mapStateToProps)(Layout);
