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
      <ul className="vertical large-horizontal menu">
        <li><Link to="/documents">Manage Documents</Link></li>
        <li><Link to="/forms">Manage Forms</Link></li>
        <li><Link to="/processes">Manage Processes</Link></li>
      </ul>

    );
  }
}
