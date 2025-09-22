import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Header.css';
import { Link, useNavigate } from 'react-router-dom';
import User from '../../../modules/user/User/User';
import CurrentUser from '../../config/user';
import { LoadJS } from '../../../libraries/datatables/datatables';
import settingsHTTPService from '../../services/settingsHTTPService';

const Header = ({ connected, handleClick }) => {

    let history = useNavigate()
    const [headerSettings, setHeaderSettings] = useState({});
    const logout = () => {
        handleClick(false)
        localStorage.clear()
        history.push("/login")
    }



    useEffect(() => {


        LoadJS()


    }, []);

    useEffect(() => {
        getFooterSettings()
    }, []);

    const getFooterSettings = () => {
        settingsHTTPService.getHeaderSettings().then(data => {
            setHeaderSettings(data.data[0])
            console.log(data.data[0])
        })
    }



    return (
        <div id="right-panel" className="right-panel" style={{ display: (connected ? 'block' : 'none'), background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
            <header id="header" className="header" style={{ background: '#f5f6fa', borderRadius: '16px 16px 0 0', color: '#222', boxShadow: '0 2px 8px #e0e4ea33', padding: '12px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="top-left" style={{ display: 'flex', alignItems: 'center', gap: 18, width: '100%' }}>
                    {/* Logo removed */}
                    {/* Centered header title and quicklinks */}
                    <div className="header-title" style={{ marginLeft: 24, fontWeight: 700, fontSize: 22, letterSpacing: 1, color: '#1976d2', display: 'flex', alignItems: 'center', gap: 10 }}>
                        <i className="fa fa-gem" style={{ fontSize: 24, color: '#43a047' }}></i>
                        <span style={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: 2 }}>MANAGEM</span>
                    </div>
                    <div className="header-quicklinks" style={{ marginLeft: 32, display: 'flex', gap: 18 }}>
                        <Link to="/projects" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none', fontSize: 16 }}><i className="fa fa-folder-open" style={{ color: '#1976d2' }}></i> Projects</Link>
                        <Link to="/tasks" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none', fontSize: 16 }}><i className="fa fa-tasks" style={{ color: '#1976d2' }}></i> Tasks</Link>
                        <Link to="/teams" style={{ color: '#1976d2', fontWeight: 500, textDecoration: 'none', fontSize: 16 }}><i className="fa fa-users" style={{ color: '#1976d2' }}></i> Teams</Link>
                    </div>
                </div>
                <div className="top-right" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <div className="header-menu" style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                        {/* Toolbar icons */}
                        <div className="toolbar-icons" style={{ display: 'flex', alignItems: 'center', gap: 18, marginRight: 18 }}>
                            <button type="button" style={{ background: 'none', border: 'none', color: '#1976d2', fontSize: 22, cursor: 'pointer' }} aria-label="Notifications">
                                <i className="fa fa-bell" style={{ color: '#1976d2' }}></i>
                            </button>
                            <button type="button" style={{ background: 'none', border: 'none', color: '#43a047', fontSize: 22, cursor: 'pointer' }} aria-label="Settings">
                                <i className="fa fa-cog" style={{ color: '#43a047' }}></i>
                            </button>
                            <button type="button" style={{ background: 'none', border: 'none', color: '#d32f2f', fontSize: 22, cursor: 'pointer' }} aria-label="Help">
                                <i className="fa fa-question-circle" style={{ color: '#d32f2f' }}></i>
                            </button>
                        </div>
                        <div className="user-area dropdown float-right" style={{ marginLeft: 18 }}>
                            <button type="button" className="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} aria-label="User menu">
                                <img className="user-avatar rounded-circle" src="images/admin.png" alt="User Avatar" style={{ height: 38, width: 38, borderRadius: '50%', boxShadow: '0 2px 8px #1976d233', marginRight: 8 }} />
                                <span style={{ color: '#1976d2', fontWeight: 600, fontSize: 16 }}>Admin</span>
                                <i className="fa fa-chevron-down" style={{ color: '#1976d2', fontSize: 16 }}></i>
                            </button>
                            <div className="user-menu dropdown-menu" style={{ minWidth: 180, borderRadius: 12, boxShadow: '0 2px 8px #1976d233', background: '#fff', color: '#333', padding: 10, right: 0, left: 'auto', top: 48, position: 'absolute' }}>
                                <Link to="/profile" className="nav-link" style={{ color: '#1976d2', fontWeight: 500 }}><i className="fa fa-user"></i> My Profile</Link>
                                <Link to="/configuration" className="nav-link" style={{ color: '#1976d2', fontWeight: 500 }}><i className="fa fa-cog"></i> Settings</Link>
                                <Link to="/" onClick={logout} className="nav-link" style={{ color: '#d32f2f', fontWeight: 500 }}><i className="fa fa-power-off"></i> Log out</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}


export default Header;
