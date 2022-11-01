import React, { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Content from '../Content/Content';

import { BrowserRouter as Router, Route } from "react-router-dom"
import Footer from '../Footer/Footer';
import Login from '../../../main/shared/Login/Login'
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import Path from '../Path/Path';


const Root = () => {

  const [connected, setConnected] = useState(false);


  const handleClick = num => {
    setConnected(num)
  };


  return (
    <div>
      <Router>
        {connected === true ?
          <div>
            <Navigation connected={connected} />
            <Header connected={connected} handleClick={handleClick} />


            <div id="right-panel" className="right-panel">
              <div className="content">

                <div className="animated fadeIn">
                  <div className="row">

                    <Content connected={connected} />

                  </div>
                </div>
              </div>

              <div className="clearfix"></div>
              <Footer connected={connected} />


            </div>
          </div> : <Login handleClick={handleClick} />}
      </Router>
    </div>
  );

}



Root.propTypes = {};

Root.defaultProps = {};

export default Root;
