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
      <ul className="menu vertical" id="navigationMenu">
        <li data-close="offCanvas"><Link to="/documents"><i className="fi-page-copy"></i>Manage Documents</Link></li>
        <li data-close="offCanvas"><Link to="/forms"><i className="fi-clipboard-pencil"></i>Manage Forms</Link></li>
        <li data-close="offCanvas"><Link to="/processes"><i className="fi-loop"></i>Manage Processes</Link></li>
      </ul>

    );
  }
}
