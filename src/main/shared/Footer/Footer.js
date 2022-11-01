import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import { useEffect } from 'react';
import settingsHTTPService from '../../services/settingsHTTPService';
import { useState } from 'react';

const Footer = ({ connected }) => {

  const [footerSettings, setFooterSettings] = useState({});

  useEffect(() => {
    getFooterSettings()
  }, []);


  const getFooterSettings = () => {
    settingsHTTPService.getFooterSettings().then(data => {
      setFooterSettings(data.data[0])
      console.log(data.data[0])
    })
  }
  return (
    <footer style={{ display: (connected ? 'block' : 'none') }} className="site-footer">
      <div className="footer-inner bg-white">
        {footerSettings.enableFooter == 1 &&
          <div className="row">
            <div className="col-sm-6">
              Developed by <a href="">delta dev software</a>
            </div>
            <div className="col-sm-6 text-right">

            </div>
          </div>}
      </div>
    </footer>
  )
};

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
