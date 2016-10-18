import React from "react";
import {Link, browserHistory} from "react-router";
import { connect } from 'react-redux';

import Nav from "./Nav";
import Footer from "./Footer";


class Layout extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const { location } = this.props;
    const containerStyle = {marginTop: "60px"};
    return (
      <div>

        <div className="off-canvas-wrapper">
          <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
            <div className="off-canvas position-left" id="offCanvas" data-off-canvas>
              <button className="close-button" aria-label="Close menu" type="button" data-close>
                <span aria-hidden="true">&times;</span>
              </button>
              <Nav location={location} />
            </div>
            <div className="off-canvas-content" data-off-canvas-content>
              <button type="button" class="button" data-toggle="offCanvas">Open Menu</button>
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
