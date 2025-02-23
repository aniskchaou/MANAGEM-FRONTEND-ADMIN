import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../../../main/shared/Login/Login';
import Content from '../Content/Content';

const Root = () => {
  const [connected, setConnected] = useState(false);

  const handleClick = (num) => {
    setConnected(num);
  };

  return (
    <Router>
      {connected ? (
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
        </div>
      ) : (
        <Login handleClick={handleClick} />
      )}
    </Router>
  );
};

export default Root;
