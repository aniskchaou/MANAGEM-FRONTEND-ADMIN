import React from 'react';
import Header from '../Header/Header';
import { Link } from "react-router-dom"

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
            <li className="active">
              <Link to="/dashboard"><i className="menu-icon fa fa-laptop"></i>Tableau de bord </Link>
            </li>
            <li>
              <Link to="/projects"><i className="menu-icon fa fa-laptop"></i>Mes Projets </Link>
            </li>
            <li>
              <Link to="/tasks"><i className="menu-icon fa fa-laptop"></i>Mes Taches </Link>
            </li>
            <li>
              <Link to="/task"><i className="menu-icon fa fa-laptop"></i>Ma tache </Link>
            </li>
            <li>
              <Link to="/note"><i className="menu-icon fa fa-laptop"></i>Mes Notes </Link>
            </li>
            
            <li>
              <Link to="/user"><i className="menu-icon fa fa-laptop"></i>Utilisateurs </Link>
            </li>
            
            <li>
              <Link to="/message"><i className="menu-icon fa fa-laptop"></i>Messages</Link>
            </li>
            
            <li>
              <Link to="/client"><i className="menu-icon fa fa-laptop"></i>Clients </Link>
            </li>
            <li>
              <Link to="/configuration"><i className="menu-icon fa fa-laptop"></i>Paramètres </Link>
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
