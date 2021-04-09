import React from 'react';
import PropTypes from 'prop-types';
import './Footer.css';
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';

const Footer = () => (


  <footer style={{ display: (CurrentUser.CONNECTED_USER ? 'block' : 'none') }} className="site-footer">
    <div className="footer-inner bg-white">
      <div className="row">
        <div className="col-sm-6">
          Developed by <a href="https://github.com/aniskchaou">Anis KCHAOU</a>
        </div>
        <div className="col-sm-6 text-right">
          Designed by <a href="https://colorlib.com">Colorlib</a>
        </div>
      </div>
    </div>
  </footer>
);

Footer.propTypes = {};

Footer.defaultProps = {};

export default Footer;
