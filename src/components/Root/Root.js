import React from 'react';
import Navigation from '../Navigation/Navigation';
import Header from '../Header/Header';
import Content from '../Content/Content';

import { BrowserRouter as Router, Route } from "react-router-dom"
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Path from '../Path/Path';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
  

    return (
      <div>
        <Router>
        <Navigation />
        <Header/>
        
        
        <div id="right-panel" className="right-panel">
       

          <div className="content">
            <div className="animated fadeIn">
              <div className="row">

                <Content/>


              </div>
            </div>
          </div>

          <div className="clearfix"></div>
          <Footer/>
          

        </div>
        </Router>
      </div>
    );
  }
}



Root.propTypes = {};

Root.defaultProps = {};

export default Root;
