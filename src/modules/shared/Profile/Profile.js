import React from 'react';
import './Profile.css';
import CurrentUser from '../../../main/config/user';
import { FaUser, FaBirthdayCake, FaEnvelope, FaPhone, FaMapMarkerAlt, FaUserShield, FaEdit, FaHistory } from 'react-icons/fa';

const demoActivity = [
  { action: 'Logged in', date: '2025-09-21' },
  { action: 'Updated profile', date: '2025-09-18' },
  { action: 'Changed password', date: '2025-09-15' },
];

const Profile = () => (
  <div className="profile-container">
    <div className="profile-card">
      <div className="profile-header">
        <img className="profile-avatar" alt="avatar" src="images/admin.jpg" />
        <div className="profile-title">
          <h2><FaUser style={{ marginRight: 8 }} />{CurrentUser.USER_DETAIL?.name || 'User Name'}</h2>
          <button className="btn btn-info profile-edit-btn"><FaEdit style={{ marginRight: 6 }} /> Edit Profile</button>
        </div>
      </div>
      <div className="profile-details">
        <div><FaBirthdayCake style={{ marginRight: 8 }} /> {CurrentUser.USER_DETAIL?.birthday ? CurrentUser.USER_DETAIL.birthday.substring(0, 10) : 'Birthday'}</div>
        <div><FaEnvelope style={{ marginRight: 8 }} /> {CurrentUser.USER_DETAIL?.email || 'Email'}</div>
        <div><FaPhone style={{ marginRight: 8 }} /> {CurrentUser.USER_DETAIL?.telephone || 'Phone'}</div>
        <div><FaMapMarkerAlt style={{ marginRight: 8 }} /> {CurrentUser.USER_DETAIL?.address || 'Address'}</div>
        <div><FaUserShield style={{ marginRight: 8 }} /> {CurrentUser.USER_DETAIL?.role || 'Role'}</div>
      </div>
      <div className="profile-activity">
        <h5><FaHistory style={{ marginRight: 8 }} /> Recent Activity</h5>
        <ul>
          {demoActivity.map((a, i) => (
            <li key={i}>{a.date}: {a.action}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);



export default Profile;
