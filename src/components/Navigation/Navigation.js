import React from 'react';
import Header from '../Header/Header';

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
              <a href="/dashboard"><i className="menu-icon fa fa-laptop"></i>Tableau de bord </a>
            </li>
            <li>
              <a href="/projects"><i className="menu-icon fa fa-laptop"></i>Mes Projets </a>
            </li>
            <li>
              <a href="/tasks"><i className="menu-icon fa fa-laptop"></i>Mes Taches </a>
            </li>
            <li>
              <a href="/task"><i className="menu-icon fa fa-laptop"></i>Ma tache </a>
            </li>
            <li>
              <a href="/note"><i className="menu-icon fa fa-laptop"></i>Mes Notes </a>
            </li>
            
            <li>
              <a href="/user"><i className="menu-icon fa fa-laptop"></i>Utilisateurs </a>
            </li>
            
            <li>
              <a href="/message"><i className="menu-icon fa fa-laptop"></i>Messages</a>
            </li>
            
            <li>
              <a href="/client"><i className="menu-icon fa fa-laptop"></i>Clients </a>
            </li>
            <li>
              <a href="/configuration"><i className="menu-icon fa fa-laptop"></i>Paramètres </a>
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
