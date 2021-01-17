import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => (
  <div id="right-panel" className="right-panel">
      <header id="header" className="header">
          <div className="top-left">
              <div className="navbar-header">
                  <a className="navbar-brand" href="./"><img src="images/logo.png" alt="Logo" /></a>
                  <a className="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo" /></a>
                  <a id="menuToggle" className="menutoggle"><i className="fa fa-bars"></i></a>
              </div>
          </div>
          <div className="top-right">
              <div className="header-menu">
                  <div className="header-left">
                      <button className="search-trigger"><i className="fa fa-search"></i></button>
                      <div className="form-inline">
                          <form className="search-form">
                              <input className="form-control mr-sm-2" type="text" placeholder="Search ..." aria-label="Search"/>
                              <button className="search-close" type="submit"><i className="fa fa-close"></i></button>
                          </form>
                      </div>

                      <div className="dropdown for-notification">
                          <button className="btn btn-secondary dropdown-toggle" type="button" id="notification" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-bell"></i>
                              <span className="count bg-danger">3</span>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="notification">
                              <p className="red">You have 3 Notification</p>
                              <a className="dropdown-item media" href="#">
                                  <i className="fa fa-check"></i>
                                  <p>...........</p>
                              </a>
                            
                          </div>
                      </div>

                      <div className="dropdown for-message">
                          <button className="btn btn-secondary dropdown-toggle" type="button" id="message" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              <i className="fa fa-envelope"></i>
                              <span className="count bg-primary">4</span>
                          </button>
                          <div className="dropdown-menu" aria-labelledby="message">
                              <p className="red">You have 4 Mails</p>
                              <a className="dropdown-item media" href="#">
                                  <span className="photo media-left"><img alt="avatar" src="images/avatar/1.jpg"/></span>
                                  <div className="message media-body">
                                      <span className="name float-left">Jonathan Smith</span>
                                      <span className="time float-right">Just now</span>
                                      <p>Hello, this is an example msg</p>
                                  </div>
                              </a>
                             
                          </div>
                      </div>
                  </div>

                  <div className="user-area dropdown float-right">
                      <a href="#" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          <img className="user-avatar rounded-circle" src="images/admin.png" alt="User Avatar"/>
                      </a>

                      <div className="user-menu dropdown-menu">
                          <Link to="/profile" className="nav-link" href="#"><i className="fa fa-user"></i>Mon Profile</Link>

                          

                          <Link to="/configuration" className="nav-link" href="#"><i className="fa fa-cog"></i>Paramètres</Link>

                          <Link to="/" className="nav-link" href="#"><i className="fa fa-power-off"></i>Déconnexion</Link>
                      </div>
                  </div>
              </div>
          </div>
      </header>
  </div>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
