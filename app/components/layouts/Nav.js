import React from "react";
import {Link, IndexLink, browserHistory} from "react-router";

export default class Nav extends React.Component{
  constructor (){
    super();
  }
  render(){
    const { location } = this.props;
    const homeClass = location.pathname === "/" ? "active" : "";

    return (
      <ul class="vertical large-horizontal menu">
      </ul>
    );
  }
}
