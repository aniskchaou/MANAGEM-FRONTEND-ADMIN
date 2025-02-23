import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './ProjectSummary.css';
import projectHTTPService from "../../../main/services/projectHTTPService";
const ProjectSummary = () => {

  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [done, setDone] = useState(0);
  const [blocked, setBlocked] = useState(0);

  useEffect(() => {
    projectHTTPService.getTodo().then(data => {
      setTodo(data.data.todo)
    })
    projectHTTPService.getInprogress().then(data => {
      setInprogress(data.data.inprogress)
    })
    projectHTTPService.getDone().then(data => {
      setDone(data.data.done)
    })
    projectHTTPService.getBlocked().then(data => {
      setBlocked(data.data.blocked)
    })
  }, []);



  return (
    <div className="ProjectSummary">
      <div className="row">
        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-1">
                  <i class="fas fa-list-ul"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{todo}</span>
                    </div>
                    <div className="stat-heading">Todo</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-2">
                  <i class="far fa-play-circle"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{inprogress}</span>
                    </div>
                    <div className="stat-heading">In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-3">
                  <i class="fas fa-check"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{done}</span>
                    </div>
                    <div className="stat-heading">Done</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3 col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="stat-widget-five">
                <div className="stat-icon dib flat-color-4">
                  <i class="far fa-stop-circle"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{blocked}</span>
                    </div>
                    <div className="stat-heading">Blocked</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};



export default ProjectSummary;
