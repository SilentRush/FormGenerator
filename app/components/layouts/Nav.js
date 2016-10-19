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
        <li data-close="offCanvas"><Link to="/documents"><i className="fa fa-pencil-square-o"></i>&nbsp; Manage Documents</Link></li>
        <li data-close="offCanvas"><Link to="/forms"><i className="fa fa-file-code-o" style={{marginRight: "0.4rem"}}></i>&nbsp; Manage Forms</Link></li>
        <li data-close="offCanvas"><Link to="/processes"><i className="fa fa-cogs"></i>&nbsp; Manage Processes</Link></li>
      </ul>

    );
  }
}
