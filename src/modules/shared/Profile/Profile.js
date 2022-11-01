import React from 'react';
import PropTypes from 'prop-types';
import './Profile.css';
import CurrentUser from '../../../main/config/user';

const Profile = () => (
  <div className="Profile">
    <div class="col-md-12">
      <div class="feed-box text-center">
        <section class="card">
          <div class="card-body">
            <div class="corner-ribon blue-ribon">
              <i class="fa fa-twitter"></i>
            </div>
            <a href="#">
              <img class="align-self-center rounded-circle mr-3" alt="" src="images/admin.jpg" ></img>
            </a>
            <h2>{CurrentUser.USER_DETAIL.name}</h2>
            <p>{CurrentUser.USER_DETAIL.birthday.substring(0, 10)}</p>
            <p>{CurrentUser.USER_DETAIL.email}</p>
            <p>{CurrentUser.USER_DETAIL.telephone}</p>
            <p>{CurrentUser.USER_DETAIL.address}</p>
            <p>{CurrentUser.USER_DETAIL.role}</p>

          </div>
        </section>
      </div>
    </div>
  </div>
);

Profile.propTypes = {};

Profile.defaultProps = {};

export default Profile;
