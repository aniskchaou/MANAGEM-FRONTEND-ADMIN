import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Tasks.css';
import ViewTask from '../ViewTask/ViewTask';
import AddTask from '../AddTask/AddTask';
import EditTask from '../EditTask/EditTask';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import taskMessage from '../../../main/messages/taskMessage';
import TaskTestService from '../../../main/mocks/TaskTestService';
import HTTPService from '../../../main/services/userHTTPService';
import taskHHTPService from '../../../main/services/taskHHTPService';
import { NavLink } from 'react-router-dom';
import { Typography, Button, LinearProgress } from '@mui/material';
import { Menu, MenuItem } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TaskSummary from '../../../modules/task/TaskSummary/TaskSummary';
import CurrentUser from '../../../main/config/user';

const Tasks = () => {
  // Dummy project lookup (replace with real lookup if available)
  const projectNames = {
    '1': 'Project Alpha',
    '2': 'Project Beta',
    '3': 'Project Gamma',
    '4': 'Project Delta',
    // Add more mappings as needed
  };

  // Actions menu state
  const [anchorEls, setAnchorEls] = useState({});
  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };
  // View state: 'table', 'card', 'kanban', 'calendar'
  const [view, setView] = useState('table');

  // Card/Grid View: responsive cards
  const CardGridView = () => {
    const filtered = filteredTasks();
    if (filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No tasks" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No tasks found</div>
      </div>;
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, height: 430, overflowY: 'auto', padding: 8 }}>
        {filtered.map(t => (
          <div key={t.taskId} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 120, transition: 'box-shadow 0.2s', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{t.title}</span>
              <span style={{ background: t.status === 'Completed' ? '#43a047' : t.status === 'In Progress' ? '#1976d2' : '#e53935', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>{t.status}</span>
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Project: {t.projectId || '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Priority: {t.priority || '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Assigned: {t.assigned || '—'}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button size="small" variant="outlined" color="info" onClick={() => setUpdatedItem(t)}>View</Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => setUpdatedItem(t)}>Edit</Button>
              <Button size="small" variant="outlined" color="error" onClick={() => removeOne(t.taskId)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Kanban View: group tasks by status
  const KanbanView = () => {
    const filtered = filteredTasks();
    const statuses = ['To Do', 'In Progress', 'Completed', 'Blocked'];
    const grouped = statuses.map(status => ({
      status,
      tasks: filtered.filter(t => t.status === status)
    }));
    return (
      <div style={{ display: 'flex', gap: 16, height: 430, overflowX: 'auto', padding: 8 }}>
        {grouped.map(group => (
          <div key={group.status} style={{ flex: 1, minWidth: 220, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: '#1976d2', marginBottom: 8 }}>{group.status}</div>
            {group.tasks.length === 0 ? <div style={{ color: '#aaa', fontSize: 13 }}>No tasks</div> : group.tasks.map(t => (
              <div key={t.taskId} style={{ background: '#f5f6fa', borderRadius: 8, marginBottom: 8, padding: 8, boxShadow: '0 1px 2px #eee' }}>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Due: {t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '—'}</div>
                <div style={{ fontSize: 12, color: '#888' }}>Priority: {t.priority || '—'}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Calendar View: show tasks by due date (simple month grid)
  const CalendarView = () => {
    // Example: August 2025, starting Friday
    const daysInMonth = 31;
    const firstDay = 5; // Friday
    const calendar = [];
    let day = 1;
    for (let i = 0; i < 5; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(null);
        } else {
          week.push(day++);
        }
      }
      calendar.push(week);
    }
    const filtered = filteredTasks();
    return (
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 1px 4px #ddd', padding: 16, height: 430, overflowY: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 12 }}>
          <thead>
            <tr>
              {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(day => (
                <th key={day} style={{ textAlign: 'center', padding: '6px', color: '#43a047', fontWeight: 700 }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {calendar.map((week, i) => (
              <tr key={i}>
                {week.map((d, j) => (
                  <td key={j} style={{ textAlign: 'center', verticalAlign: 'top', height: 48 }}>
                    {d ? <div>
                      <div style={{ fontWeight: 700, color: '#43a047' }}>{d}</div>
                      {filtered.filter(t => t.dueDate && new Date(t.dueDate).getDate() === d).map(t => (
                        <div key={t.taskId} style={{ background: '#1976d2', color: '#fff', borderRadius: 8, padding: '2px 6px', fontSize: 12, margin: '2px 0' }}>{t.title}</div>
                      ))}
                    </div> : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  // Filtered tasks by search
  const filteredTasks = () => {
    if (!search.trim()) return tasks;
    const s = search.toLowerCase();
    return tasks.filter(t =>
      (t.title?.toLowerCase().includes(s) ||
        t.projectId?.toLowerCase().includes(s) ||
        t.status?.toLowerCase().includes(s) ||
        t.priority?.toLowerCase().includes(s))
    );
  };

  // Summary stats
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const inProgress = tasks.filter(t => t.status === 'In Progress').length;
  const highPriority = tasks.filter(t => t.priority === 'High').length;
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);


  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    resfresh()
    closeButtonAdd.current.click()
  }

  useEffect(() => {
    LoadJS()
    retrieveTasks()
  }, []);


  const getAll = () => {
    HTTPService.getAll()
      .then(response => {
        setTasks(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const removeOne = (data) => {
    HTTPService.remove(data)
      .then(response => {

      })
      .catch(e => {

      });
  }



  const retrieveTasks = () => {
    taskHHTPService.getAllTask().then(data => {
      setTasks(data.data)
      console.log(data.data)
    });
    ;
  };

  const resfresh = () => {
    retrieveTasks()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      //TaskTestService.remove(data)
      taskHHTPService.removeTask(data).then(data => {
        showMessage('Confirmation', taskMessage.delete, 'success')
        retrieveTasks()
      })
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }

  const columns = [
    { field: 'taskId', headerName: '#', width: 80 },
    {
      field: 'projectId',
      headerName: 'Project',
      width: 160,
      renderCell: (params) => (
        <span style={{ fontWeight: 600, color: '#1976d2' }}>{projectNames[params.value] || params.value || '—'}</span>
      )
    },
    { field: 'title', headerName: 'Title', width: 200 },
    {
      field: 'status',
      headerName: 'Status',
      width: 120,
      renderCell: (params) => (
        <span style={{ display: 'inline-block', background: params.value === 'Completed' ? '#43a047' : params.value === 'In Progress' ? '#1976d2' : '#e53935', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>{params.value}</span>
      )
    },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 140,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 110,
      renderCell: (params) => (
        <span style={{ display: 'inline-block', background: params.value === 'High' ? '#e53935' : params.value === 'Medium' ? '#ffa726' : '#1976d2', color: '#fff', borderRadius: 12, padding: '2px 12px', fontSize: 13 }}>{params.value || '—'}</span>
      )
    },
    {
      field: 'assigned',
      headerName: 'Assigned',
      width: 140,
      valueGetter: () => '—'
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Button size="small" variant="outlined" color="primary" onClick={(e) => { e.stopPropagation(); handleMenuOpen(e, params.row.taskId); }}>
            <i className="fas fa-ellipsis-v"></i>
          </Button>
          <Menu
            anchorEl={anchorEls[params.row.taskId]}
            open={Boolean(anchorEls[params.row.taskId])}
            onClose={() => handleMenuClose(params.row.taskId)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { handleMenuClose(params.row.taskId); setUpdatedItem(params.row); }}>View</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.taskId); setUpdatedItem(params.row); }}>Edit</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.taskId); removeOne(params.row.taskId); }}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];



  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = tasks.find(item => item.id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const removeAll = (e) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      /*   certificateHTTPService.removeAllCertificates().then(data => {
          getAllPatient()
        }) */
    }
  }
  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fa fa-list" style={{ marginRight: 10 }}></i> Tasks</h4>
          <Button size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help" title="This page shows all tasks. Use the search bar to filter. Click the + button to add a new task."><i className="fas fa-info-circle"></i></Button>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by title, project, or status..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search tasks"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>


        {/* Summary stats and all action buttons in one horizontal line */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: 18, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
            <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total: {total}</span>
            <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> Completed: {completed}</span>
            <span><i className="fas fa-bolt" style={{ marginRight: 6, color: '#1976d2' }}></i> In Progress: {inProgress}</span>
            <span><i className="fas fa-exclamation-triangle" style={{ marginRight: 6, color: '#e53935' }}></i> High Priority: {highPriority}</span>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addTasks"><i className="far fa-plus-square"></i>  Create</button>
            <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-outline-primary btn-sm"><i className="fas fa-edit"></i> Edit</button>
            <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-outline-primary btn-sm"><i className="fas fa-trash-alt"></i> Remove</button>
            <button type="button" className={`btn btn-outline-primary btn-sm${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}><i className="fas fa-list"></i> Table</button>
            <button type="button" className={`btn btn-outline-primary btn-sm${view === 'card' ? ' active' : ''}`} onClick={() => setView('card')}><i className="fas fa-th-large"></i> Cards</button>
            <button type="button" className={`btn btn-outline-primary btn-sm${view === 'kanban' ? ' active' : ''}`} onClick={() => setView('kanban')}><i className="fas fa-columns"></i> Kanban</button>
            <button type="button" className={`btn btn-outline-primary btn-sm${view === 'calendar' ? ' active' : ''}`} onClick={() => setView('calendar')}><i className="fas fa-calendar-alt"></i> Calendar</button>
          </div>
        </div>
        {loading ?
          <LinearProgress />
          : (
            <>
              {view === 'table' && (() => {
                const filtered = filteredTasks();
                if (filtered.length === 0) {
                  return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <img src="/images/empty.png" alt="No tasks" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
                    <div>No tasks found</div>
                  </div>;
                }
                return <div style={{ height: 430, width: '100%' }}><DataGrid
                  rows={filtered}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[6]}
                  checkboxSelection
                  onSelectionModelChange={handleRowSelection}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.taskId}
                /></div>;
              })()}
              {view === 'card' && <CardGridView />}
              {view === 'kanban' && <KanbanView />}
              {view === 'calendar' && <CalendarView />}
            </>
          )}
        {/* Floating Add Task Button */}
        <Button
          style={{
            position: 'fixed',
            bottom: 38,
            right: 38,
            background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '50%',
            width: 56,
            height: 56,
            boxShadow: '0 4px 16px #1976d299',
            fontSize: 28,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 1000
          }}
          aria-label="Add Task"
          data-toggle="modal"
          data-target="#addTasks"
        >
          <i className="fas fa-plus"></i>
        </Button>





        <div class="modal fade" id="addTasks" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">New</h5>
                <button onClick={resfresh} type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <AddTask closeModal={closeModalAdd} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonAdd} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>


        <div class="modal fade" id="edit" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <EditTask task={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div class="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
};



export default Tasks;
