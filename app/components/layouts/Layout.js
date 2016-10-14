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
        <Nav location={location} />
        <div>
          {this.props.children}
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
