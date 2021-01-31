import React from 'react';
import Header from '../Header/Header';
import { NavLink } from "react-router-dom"

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return(

      
    <aside id="left-panel" className="left-panel">
      <nav className="navbar navbar-expand-sm navbar-default">

        <div id="main-menu" className="main-menu collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <NavLink activeClassName="activeLink" to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Tableau de bord </NavLink>
              </li>
              <li>
                <NavLink activeClassName="activeLink" to="/timeline"><i className="menu-icon fa fa-calendar"></i>chronologie </NavLink>
              </li>
              <li>
                <NavLink activeClassName="activeLink" to="/projects"><i className="menu-icon fa fa-crosshairs"></i> Projets <span class="badge badge-secondary">3</span> </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink"  to="/tasks"><i className="menu-icon fa fa-clipboard-list"></i> Taches </NavLink>
            </li>
            <li>
                <NavLink activeClassName="activeLink" to="/task"><i className="menu-icon fa fa-dharmachakra"></i>Mes taches <span class="badge badge-primary">2</span></NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink"  to="/note"><i className="menu-icon fa fa-clipboard-list"></i>Mes Notes </NavLink>
            </li>
            
            <li>
              <NavLink activeClassName="activeLink"  to="/user"><i className="menu-icon fa fa-users"></i>Utilisateurs </NavLink>
            </li>
            
            <li>
                <NavLink activeClassName="activeLink" to="/message"><i className="menu-icon fa fa-envelope"></i>Messages<span class="badge badge-warning">1</span></NavLink>
            </li>
            
            <li>
              <NavLink activeClassName="activeLink"  to="/client"><i className="menu-icon fa fa-users"></i>Clients </NavLink>
            </li>
            <li>
              <NavLink activeClassName="activeLink"  to="/configuration"><i className="menu-icon fa fa-cog"></i>Paramètres </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </aside>);

  }
}



Navigation.propTypes = {};

Navigation.defaultProps = {};

export default Navigation;
