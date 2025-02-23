import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './MyTaskSummary.css';
import mytaskHTTPService from '../../../main/services/mytaskHTTPService'
const MyTaskSummary = () => {
  const [todo, setTodo] = useState(0);
  const [inprogress, setInprogress] = useState(0);
  const [completed, setCompleted] = useState(0);
  const [inreview, setInreview] = useState(0);

  useEffect(() => {
   /* mytaskHTTPService.getTodo().then(data => {
      setTodo(data.data.todo)
    })
    mytaskHTTPService.getInprogress().then(data => {
      setInprogress(data.data.inprogress)
    })
    mytaskHTTPService.getCompleted().then(data => {
      setCompleted(data.data.completed)
    })
    mytaskHTTPService.getinreview().then(data => {
      setInreview(data.data.inreview)
    })*/
  }, []);

  return (
    <div className="TaskSummary">
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
                      <span className="count">{completed}</span>
                    </div>
                    <div className="stat-heading">Completed</div>
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
                  <i class="fas fa-users"></i>
                </div>
                <div className="stat-content">
                  <div className="text-left dib">
                    <div className="stat-text">
                      <span className="count">{inreview}</span>
                    </div>
                    <div className="stat-heading">In review</div>
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



export default MyTaskSummary;
