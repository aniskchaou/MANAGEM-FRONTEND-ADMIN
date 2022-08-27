import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Content from '../Content/Content';

import { BrowserRouter as Router, Route } from "react-router-dom"
import Footer from '../Footer/Footer';
import Login from '../../../main/shared/Login/Login'
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import Path from '../Path/Path';


class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = { connected: CurrentUser.CONNECTED_USER };
  }
  rerender = () => {
    this.forceUpdate();
  };
  forceUpdate = () => {
    this.setState((state) => ({
      connected: CurrentUser.CONNECTED_USER
    }));
  };
  render() {


    return (
      <div>
        <Router>
          <Navigation />
          <Header rerender={this.rerender} />


          <div id="right-panel" className="right-panel">
            <div className="content">

              <div className="animated fadeIn">
                <div className="row">

                  <Content />

                </div>
              </div>
            </div>

            <div className="clearfix"></div>
            <Footer />


          </div>
          <Login rerender={this.rerender} />
        </Router>
      </div>
    );
  }
}



Root.propTypes = {};

Root.defaultProps = {};

export default Root;
