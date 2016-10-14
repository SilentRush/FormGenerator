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
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span> <span className="icon-bar"></span> <span className="icon-bar"></span> <span className="icon-bar"></span>
              </button> <IndexLink to="/" className="navbar-brand">Dealer FX</IndexLink>
            </div>
            <div className="collapse navbar-collapse" id="navbar">
              <ul className="nav navbar-nav">
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}
