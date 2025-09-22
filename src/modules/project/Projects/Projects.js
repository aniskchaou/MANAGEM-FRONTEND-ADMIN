// Chart.js imports
import { Bar, Pie, Line, Doughnut } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip as ChartTooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';


import React, { CSSProperties, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Projects.css';
import AddProject from '../AddProject/AddProject';
import EditMyTask from '../../mytask/EditMyTask/EditMyTask';
import EditProject from './../EditProject/EditProject';
import ViewProject from './../ViewProject/ViewProject';
import { useEffect } from 'react';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import projectMessage from '../../../main/messages/projectMessage';
import ProjectTestService from '../../../main/mocks/ProjectTestService';
import HTTPService from '../../../main/services/userHTTPService';
import projectHTTPService from '../../../main/services/projectHTTPService';
import Path from '../../../main/shared/Path/Path';
import { NavLink } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { Typography, Button, LinearProgress, Chip, Menu, MenuItem, IconButton } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ProjectSummary from '../../../modules/project/ProjectSummary/ProjectSummary';
import CurrentUser from '../../../main/config/user';
import Tooltip from '@mui/material/Tooltip';
Chart.register(CategoryScale, LinearScale, BarElement, Title, ChartTooltip, Legend, ArcElement, PointElement, LineElement);


const Projects = () => {
  const deleteProject = () => {
  return window.confirm(CurrentUser.DELTE_MSG)
}

// Advanced actions stubs
const exportProjectPDF = (project) => {
  alert('Exporting project as PDF: ' + (project.name || project.title || project.id));
};

const assignTeam = (project) => {
  alert('Assign team to project: ' + (project.name || project.title || project.id));
};

const setReminder = (project) => {
  alert('Set reminder for project: ' + (project.name || project.title || project.id));
};

const shareProjectByEmail = (project) => {
  alert('Share project via email: ' + (project.name || project.title || project.id));
};

// More advanced actions stubs
const markAsFavorite = (project) => {
  alert('Marked as favorite: ' + (project.name || project.title || project.id));
};

const duplicateProject = (project) => {
  alert('Duplicated project: ' + (project.name || project.title || project.id));
};

const addNoteToProject = (project) => {
  alert('Add note to project: ' + (project.name || project.title || project.id));
};

const viewAuditLog = (project) => {
  alert('View audit log for project: ' + (project.name || project.title || project.id));
};

const printProject = (project) => {
  alert('Print project: ' + (project.name || project.title || project.id));
};


  let [color, setColor] = useState("#ffffff");
  const [projects, setProjects] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [search, setSearch] = useState("");
  // Filtered projects by search
  const filteredProjects = () => {
    if (!search.trim()) return projects;
    const s = search.toLowerCase();
    return projects.filter(p =>
      (p.name?.toLowerCase().includes(s) ||
        p.title?.toLowerCase().includes(s) ||
        p.status?.toLowerCase().includes(s) ||
        p.priority?.toLowerCase().includes(s))
    );
  };

  // Summary stats
  const total = projects.length;
  const completed = projects.filter(p => p.status === 'Completed').length;
  const inProgress = projects.filter(p => p.status === 'In Progress').length;
  const highPriority = projects.filter(p => p.priority === 'High').length;

  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);

  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    console.log('close')
    closeButtonAdd.current.click()
  }
  useEffect(() => {
    LoadJS()
    setLoading(false)
    retrieveProjects()
  }, []);
  const [loading, setLoading] = useState(false);




  const retrieveProjects = () => {
    //var projects = ProjectTestService.getAll();
    setLoading(true)
    projectHTTPService.getAllProject().then(data => {
      console.log(data.data)
      setProjects(data.data);
      setLoading(false)
    })

  };

  const resfresh = () => {
    retrieveProjects()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {
      showMessage('Confirmation', projectMessage.delete, 'success')
      projectHTTPService.removeProject(data).then(data => {
        resfresh()
      })
      //removeOne(data)

    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)

  }

  const copy = (e, data) => {
    projectHTTPService.copyProject(data.id).then(data => {
      console.log(data.data)
      //buttonEdit.current.click()
      //update(data.data)
      resfresh()
    })
  }
  // Actions menu state
  const [anchorEls, setAnchorEls] = useState({});
  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

   // Download project as CSV
  const downloadProjectCSV = (project) => {
    const csv = Object.keys(project).map(key => `'${key}'`).join(',') + '\n' + Object.values(project).map(val => `'${val}'`).join(',');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${project.name || 'project'}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Only important fields
  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Completed' ? 'success' : params.value === 'In Progress' ? 'primary' : 'default'} size="small" />
    ) },
    { field: 'priority', headerName: 'Priority', width: 100, renderCell: (params) => (
      <Chip
        label={params.value || '—'}
        size="small"
        style={{
          backgroundColor: priorityColor(params.value),
          color: '#fff',
          fontWeight: 600,
          fontSize: 11,
          height: 22
        }}
      />
    ) },
    { field: 'startDate', headerName: 'Start Date', width: 120, renderCell: (params) => (
      <Chip label={params.value ? new Date(params.value).toLocaleDateString() : ''} color="info" size="small" />
    ) },
    { field: 'endDate', headerName: 'End Date', width: 120, renderCell: (params) => (
      <Chip label={params.value ? new Date(params.value).toLocaleDateString() : ''} color="warning" size="small" />
    ) },
    { field: 'budget', headerName: 'Budget', width: 100 },
    { field: 'actualCost', headerName: 'Actual Cost', width: 110 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" onClick={(e) => handleMenuOpen(e, params.row.id)}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEls[params.row.id]}
            open={Boolean(anchorEls[params.row.id])}
            onClose={() => handleMenuClose(params.row.id)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { handleMenuClose(params.row.id); alert('View details for: ' + params.row.name); }}>View Details</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); update(null, params.row); }}>Edit</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); remove(null, params.row.id); }}>Delete</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); copy(null, params.row); }}>Copy</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); alert((params.row.archived ? 'Unarchive' : 'Archive') + ' project: ' + params.row.name); }}>{params.row.archived ? 'Unarchive' : 'Archive'}</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); downloadProjectCSV(params.row); }}>Download as CSV</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); exportProjectPDF(params.row); }}>Export as PDF</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); assignTeam(params.row); }}>Assign Team</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); setReminder(params.row); }}>Set Reminder</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); shareProjectByEmail(params.row); }}>Share via Email</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); markAsFavorite(params.row); }}>Mark as Favorite</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); duplicateProject(params.row); }}>Duplicate</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); addNoteToProject(params.row); }}>Add Note</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); viewAuditLog(params.row); }}>View Audit Log</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); printProject(params.row); }}>Print Project</MenuItem>
          </Menu>
        </>
      ),
    },
  ];



  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = projects.find(item => item.id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [showCharts, setShowCharts] = useState(true);
  // Prepare chart data for Chart.js
  const statusCounts = projects.reduce((acc, p) => {
    acc[p.status] = (acc[p.status] || 0) + 1;
    return acc;
  }, {});
  const statusLabels = Object.keys(statusCounts);
  const statusValues = statusLabels.map(status => statusCounts[status]);
  // Color palettes for each chart
  const BAR_COLORS = ['#1976d2', '#00C49F', '#FFBB28', '#FF8042', '#A28BFE', '#FF6699'];
  const PIE_COLORS = ['#e57373', '#64b5f6', '#81c784', '#ffd54f', '#ba68c8', '#ff8a65'];
  const LINE_COLORS = ['#1976d2', '#FF8042'];
  const DOUGHNUT_COLORS = ['#00bcd4', '#ffb300', '#43a047', '#d32f2f', '#8e24aa', '#f06292'];

  // Doughnut chart: Projects by Priority
  const priorityCounts = projects.reduce((acc, p) => {
    acc[p.priority] = (acc[p.priority] || 0) + 1;
    return acc;
  }, {});
  const priorityLabels = Object.keys(priorityCounts);
  const priorityValues = priorityLabels.map(priority => priorityCounts[priority]);
  const doughnutChartData = {
    labels: priorityLabels,
    datasets: [
      {
        label: 'Projects by Priority',
        data: priorityValues,
        backgroundColor: DOUGHNUT_COLORS,
      },
    ],
  };

  const barChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Projects by Status',
        data: statusValues,
        backgroundColor: BAR_COLORS,
      },
    ],
  };

  const pieChartData = {
    labels: statusLabels,
    datasets: [
      {
        label: 'Projects by Status',
        data: statusValues,
        backgroundColor: PIE_COLORS,
      },
    ],
  };

  const lineChartData = {
    labels: projects.map(p => p.name || p.title || 'Project'),
    datasets: [
      {
        label: 'Budget',
        data: projects.map(p => Number(p.budget) || 0),
        borderColor: LINE_COLORS[0],
        backgroundColor: 'rgba(25, 118, 210, 0.2)',
        tension: 0.3,
      },
      {
        label: 'Actual Cost',
        data: projects.map(p => Number(p.actualCost) || 0),
        borderColor: LINE_COLORS[1],
        backgroundColor: 'rgba(255, 128, 66, 0.2)',
        tension: 0.3,
      },
    ],
  };

  // View state: 'table', 'card', 'kanban', 'calendar', 'gantt', 'tree'
  const [view, setView] = useState('table');

  // Tree View: group projects by status
  const TreeProjectsView = () => {
    // Defensive: always treat status as string, fallback to 'No Status'
    const filtered = filteredProjects();
    const grouped = (filtered && filtered.length > 0)
      ? filtered.reduce((acc, p) => {
          let status = (typeof p.status === 'string' && p.status.trim()) ? p.status : 'No Status';
          if (!acc[status]) acc[status] = [];
          acc[status].push(p);
          return acc;
        }, {})
      : {};

    // If no projects, show a message
    if (!filtered || filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No projects" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No projects found</div>
      </div>;
    }

    return (
      <div style={{ height: 430, overflowY: 'auto', width: '100%', background: '#fafbfc', borderRadius: 8, padding: 8 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowY: 'auto' }}
        >
          {Object.entries(grouped).map(([status, items]) => (
            <TreeItem key={String(status)} nodeId={String(status)} label={
              <span style={{ fontWeight: 600, color: statusColor(status) }}>{status} <span style={{ color: '#888', fontWeight: 400 }}>({items.length})</span></span>
            }>
              {items.map(p => (
                <TreeItem
                  key={String(p.id)}
                  nodeId={String(status) + '-' + String(p.id)}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between', width: '100%', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f0fc'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Chip label={p.priority || '—'} size="small" style={{ backgroundColor: priorityColor(p.priority), color: '#fff', fontWeight: 600, fontSize: 11, height: 22 }} />
                        <span style={{ fontWeight: 500 }}>{p.name || p.title}</span>
                        <span style={{ color: '#888', fontSize: 12 }}>({p.startDate ? new Date(p.startDate).toLocaleDateString() : '—'} - {p.endDate ? new Date(p.endDate).toLocaleDateString() : '—'})</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <Tooltip title="View Details"><IconButton size="small" onClick={() => alert('View details for: ' + (p.name || p.title))}><i className="fas fa-eye" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Edit"><IconButton size="small" onClick={() => update(null, p)}><i className="fas fa-edit" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" onClick={() => remove(null, p.id)}><i className="fas fa-trash" style={{ fontSize: 14, color: '#e53935' }} /></IconButton></Tooltip>
                      </div>
                    </div>
                  }
                />
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </div>
    );
  };


  // Card/Grid View: responsive cards
  const CardGridView = () => (
    (() => {
      const filtered = filteredProjects();
      if (filtered.length === 0) {
        return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <img src="/images/empty.png" alt="No projects" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
          <div>No projects found</div>
        </div>;
      }
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, height: 430, overflowY: 'auto', padding: 8 }}>
          {filtered.map(p => (
            <div key={p.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
              onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #b3d1f7'}
              onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #ddd'}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{p.name || p.title}</span>
                <Chip label={p.priority || '—'} size="small" style={{ backgroundColor: priorityColor(p.priority), color: '#fff', fontWeight: 600, fontSize: 11, height: 22, marginLeft: 8 }} />
              </div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Status: <span style={{ color: statusColor(p.status) }}>{p.status || '—'}</span></div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Start: {p.startDate ? new Date(p.startDate).toLocaleDateString() : '—'}</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>End: {p.endDate ? new Date(p.endDate).toLocaleDateString() : '—'}</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Budget: <span style={{ color: '#1976d2' }}>{p.budget || '—'}</span></div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Actual Cost: <span style={{ color: '#e53935' }}>{p.actualCost || '—'}</span></div>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button className="btn btn-xs btn-info" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => alert('View details for: ' + (p.name || p.title))}>View</button>
                <button className="btn btn-xs btn-primary" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => update(null, p)}>Edit</button>
                <button className="btn btn-xs btn-danger" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => remove(null, p.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      );
    })()
  );

  // Kanban View: group projects by status
  const priorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#e53935';
      case 'Medium': return '#fbc02d';
      case 'Low': return '#43a047';
      default: return '#bdbdbd';
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'Completed': return '#43a047';
      case 'In Progress': return '#1976d2';
      case 'On Hold': return '#ffb300';
      case 'Cancelled': return '#e53935';
      default: return '#757575';
    }
  };

  const KanbanView = () => {
    const filtered = filteredProjects();
    const statuses = Array.from(new Set(filtered.map(p => p.status)));
    return (
      <div style={{ display: 'flex', gap: 16, height: 430, overflowX: 'auto' }}>
        {statuses.map(status => {
          const cards = filtered.filter(p => p.status === status);
          return (
            <div key={status} style={{ flex: 1, minWidth: 260, background: '#f7f7f7', borderRadius: 8, padding: 8, boxShadow: '0 1px 4px #ddd', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <h6 style={{ textAlign: 'center', color: statusColor(status), flex: 1, margin: 0 }}>{status || 'No Status'}</h6>
                <span style={{ background: statusColor(status), color: '#fff', borderRadius: 12, fontSize: 12, padding: '2px 10px', marginLeft: 8 }}>{cards.length}</span>
              </div>
              {cards.length === 0 && <div style={{ color: '#aaa', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/images/empty.png" alt="No projects" style={{ width: 60, opacity: 0.5, marginBottom: 8 }} />
                <div>No projects</div>
              </div>}
              {cards.map(p => (
                <div key={p.id} style={{ background: '#fff', margin: '8px 0', borderRadius: 6, padding: 10, boxShadow: '0 1px 4px #eee', position: 'relative', transition: 'box-shadow 0.2s', borderLeft: `5px solid ${priorityColor(p.priority)}`, cursor: 'pointer' }}
                  onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #b3d1f7'}
                  onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #eee'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: 15, flex: 1 }}>{p.name || p.title}</strong>
                    <span style={{ marginLeft: 8 }}>
                      <Chip
                        label={p.priority || '—'}
                        size="small"
                        style={{
                          backgroundColor: priorityColor(p.priority),
                          color: '#fff',
                          fontWeight: 600,
                          fontSize: 11,
                          height: 22
                        }}
                      />
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Due: {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Budget: <span style={{ color: '#1976d2' }}>{p.budget || '—'}</span></div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Actual Cost: <span style={{ color: '#e53935' }}>{p.actualCost || '—'}</span></div>
                  <div style={{ fontSize: 12, color: statusColor(status), marginBottom: 2 }}>Status: {p.status || '—'}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <button className="btn btn-xs btn-info" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => alert('View details for: ' + (p.name || p.title))}>View</button>
                    <button className="btn btn-xs btn-primary" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => update(null, p)}>Edit</button>
                    <button className="btn btn-xs btn-danger" style={{ fontSize: 11, padding: '2px 8px' }} onClick={() => remove(null, p.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    );
  };

  // Calendar View: show projects by due date (enhanced month grid with navigation, chips, tooltips)
  
  const [calendarDate, setCalendarDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const CalendarView = () => {
    const year = calendarDate.getFullYear();
    const month = calendarDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    // First day of week (0=Sun, 1=Mon...)
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    // Map due dates to days
    const projectsByDay = {};
    projects.forEach(p => {
      // Use dueDate, or endDate, or startDate, or skip if none
      let dateStr = p.dueDate || p.endDate || p.startDate;
      if (dateStr) {
        const d = new Date(dateStr);
        if (!isNaN(d) && d.getFullYear() === year && d.getMonth() === month) {
          const day = d.getDate();
          if (!projectsByDay[day]) projectsByDay[day] = [];
          projectsByDay[day].push(p);
        }
      }
    });
    // Weekday labels
    const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    // Month label
    const monthLabel = calendarDate.toLocaleString('default', { month: 'long', year: 'numeric' });
    // Navigation handlers
    const prevMonth = () => {
      setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    };
    const nextMonth = () => {
      setCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    };
    // Build calendar grid (with blanks for first week)
    const calendarCells = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      calendarCells.push(<div key={'blank-' + i} style={{ minHeight: 60 }}></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      calendarCells.push(
        <div key={day} style={{ minHeight: 60, border: '1px solid #eee', borderRadius: 4, padding: 4, background: '#fafbfc', position: 'relative' }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{day}</div>
          {(projectsByDay[day] || []).map(p => (
            <Tooltip key={p.id} title={
              <div style={{ minWidth: 180 }}>
                <div><strong>{p.name || p.title}</strong></div>
                <div>Status: {p.status}</div>
                <div>Priority: {p.priority}</div>
                <div>Budget: {p.budget || '—'}</div>
                <div>Actual Cost: {p.actualCost || '—'}</div>
                <div>Due: {p.dueDate ? new Date(p.dueDate).toLocaleDateString() : '—'}</div>
              </div>
            } placement="top" arrow>
              <Chip
                label={p.name || p.title}
                size="small"
                style={{
                  backgroundColor: priorityColor(p.priority),
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 11,
                  height: 22,
                  margin: '2px 0',
                  cursor: 'pointer',
                  width: '100%',
                  justifyContent: 'flex-start',
                  textAlign: 'left',
                }}
                onClick={() => alert('View details for: ' + (p.name || p.title))}
              />
            </Tooltip>
          ))}
        </div>
      );
    }
    return (
      <div style={{ width: '100%', height: 430, overflowY: 'auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <button className="btn btn-xs btn-light" onClick={prevMonth}>&lt; Prev</button>
          <span style={{ fontWeight: 600, fontSize: 16 }}>{monthLabel}</span>
          <button className="btn btn-xs btn-light" onClick={nextMonth}>Next &gt;</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 4 }}>
          {weekdayLabels.map(w => (
            <div key={w} style={{ fontWeight: 600, fontSize: 13, textAlign: 'center', color: '#888' }}>{w}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {calendarCells}
        </div>
      </div>
    );
  };

  // Gantt View: show projects as bars on a timeline (enhanced)
  const GanttView = () => {
    // Collect all start and end dates
    const bars = projects.map(p => {
      // Prefer startDate, fallback to endDate/dueDate, fallback to today
      let startStr = p.startDate || p.dueDate || p.endDate;
      let endStr = p.endDate || p.dueDate || p.startDate;
      if (!startStr && !endStr) return null;
      const start = startStr ? new Date(startStr) : null;
      const end = endStr ? new Date(endStr) : null;
      if (!start || !end || isNaN(start) || isNaN(end)) return null;
      return { ...p, start, end };
    }).filter(Boolean);
    if (bars.length === 0) return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No project dates</div>;
    // Find min and max dates
    const minDate = new Date(Math.min(...bars.map(b => b.start.getTime())));
    const maxDate = new Date(Math.max(...bars.map(b => b.end.getTime())));
    const totalDays = Math.max(1, Math.ceil((maxDate - minDate) / (1000*60*60*24)));
    // Helper to get percent offset and width
    const getBarStyle = (start, end, color) => {
      const offsetDays = Math.max(0, Math.floor((start - minDate) / (1000*60*60*24)));
      const barDays = Math.max(1, Math.ceil((end - start) / (1000*60*60*24)));
      const left = (offsetDays / totalDays) * 100;
      const width = (barDays / totalDays) * 100;
      return {
        position: 'absolute',
        left: left + '%',
        width: width + '%',
        background: color,
        borderRadius: 4,
        height: 18,
        minWidth: 16,
        boxShadow: '0 1px 4px #bbb',
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 8,
        color: '#fff',
        fontWeight: 600,
        fontSize: 12,
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
      };
    };
    // Timeline header (dates)
    const headerDays = [];
    for (let i = 0; i <= totalDays; i += Math.ceil(totalDays / 8) || 1) {
      const d = new Date(minDate.getTime() + i * 24*60*60*1000);
      headerDays.push(<div key={i} style={{ flex: 1, fontSize: 11, color: '#888', textAlign: 'center' }}>{d.toLocaleDateString()}</div>);
    }
    return (
      <div style={{ width: '100%', height: 430, overflowY: 'auto', padding: 16 }}>
        <div style={{ display: 'flex', marginBottom: 8, gap: 2 }}>
          <div style={{ width: 160 }}></div>
          <div style={{ flex: 1, display: 'flex' }}>{headerDays}</div>
        </div>
        {bars.map((b, idx) => (
          <div key={b.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 18, minHeight: 24 }}>
            <div style={{ width: 160, fontSize: 13, fontWeight: 600, color: '#333', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.name || b.title}</div>
            <div style={{ flex: 1, position: 'relative', height: 24, background: '#f0f0f0', borderRadius: 4 }}>
              <Tooltip title={
                <div style={{ minWidth: 180 }}>
                  <div><strong>{b.name || b.title}</strong></div>
                  <div>Status: {b.status}</div>
                  <div>Priority: {b.priority}</div>
                  <div>Budget: {b.budget || '—'}</div>
                  <div>Actual Cost: {b.actualCost || '—'}</div>
                  <div>Start: {b.start.toLocaleDateString()}</div>
                  <div>End: {b.end.toLocaleDateString()}</div>
                </div>
              } placement="top" arrow>
                <div style={getBarStyle(b.start, b.end, priorityColor(b.priority))} onClick={() => alert('View details for: ' + (b.name || b.title))}>
                  {b.name || b.title}
                </div>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
    );
  };
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
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fa fa-folder" style={{ marginRight: 10 }}></i> Projects</h4>
          <Tooltip title="This page shows all projects. Use the search bar to filter. Click the + button to add a new project." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, status, or priority..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search projects"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        {/* ...existing code... */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#addProject" style={{ minWidth: 90 }}><i className="far fa-plus-square"></i> Create</button>
          <button onClick={e => copy(e, updatedItem)} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-copy"></i> Copy</button>
          <button onClick={e => update(e, updatedItem)} type="button" data-toggle="modal" data-target="#edit" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-edit"></i> Edit</button>
          <button onClick={e => remove(e, updatedItemId)} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-trash-alt"></i> Remove</button>
          <button onClick={resfresh} type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-repeat"></i> Reload</button>
        </div>

        {/* Chart Section */}
        <div className="mb-3">
          <button className={`btn btn-sm btn-${showCharts ? 'secondary' : 'primary'} mr-2`} onClick={() => setShowCharts(v => !v)}>
            {showCharts ? 'Hide Charts' : 'Show Charts'}
          </button>
          {showCharts && (
            <div className="row">
              <div className="col-md-6 mb-3">
                <div className="card p-2">
                  <h6>Projects by Status (Bar)</h6>
                  <Bar data={barChartData} options={{ responsive: true, plugins: { legend: { display: false } } }} height={180} />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card p-2">
                  <h6>Projects by Status (Pie)</h6>
                  <Pie data={pieChartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} height={180} />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card p-2">
                  <h6>Budget vs Actual Cost (Line)</h6>
                  <Line data={lineChartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} height={180} />
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <div className="card p-2">
                  <h6>Projects by Priority (Doughnut)</h6>
                  <Doughnut data={doughnutChartData} options={{ responsive: true, plugins: { legend: { position: 'bottom' } } }} height={180} />
                </div>
              </div>
            </div>
          )}
        </div>
        {/* View Switcher */}
        <div className="btn-group ml-2 mb-2" role="group" aria-label="View Switcher" style={{ marginBottom: 10 }}>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}><i className="fas fa-list"></i> Table</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'card' ? ' active' : ''}`} onClick={() => setView('card')}><i className="fas fa-th-large"></i> Cards</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'kanban' ? ' active' : ''}`} onClick={() => setView('kanban')}><i className="fas fa-columns"></i> Kanban</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'calendar' ? ' active' : ''}`} onClick={() => setView('calendar')}><i className="fas fa-calendar-alt"></i> Calendar</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'gantt' ? ' active' : ''}`} onClick={() => setView('gantt')}><i className="fas fa-stream"></i> Gantt</button>
        </div>

        {/* Conditional rendering for views */}
        {loading ? (
          <LinearProgress />
        ) : (
          <>
            {view === 'table' && (
              <div style={{ height: 430, width: '100%' }}>
                <DataGrid
                  rows={filteredProjects()}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[6]}
                  checkboxSelection
                  onSelectionModelChange={handleRowSelection}
                  components={{ Toolbar: GridToolbar }}
                />
              </div>
            )}
            {view === 'card' && <CardGridView />}
            {view === 'kanban' && <KanbanView />}
            {view === 'calendar' && <CalendarView />}
            {view === 'gantt' && <GanttView />}
          </>
        )}
        {/* Floating Add Project Button */}
        <Tooltip title="Add Project" arrow>
          <button
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
            aria-label="Add Project"
            data-toggle="modal"
            data-target="#addProject"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>

        {/* Modals remain unchanged */}
        <div className="modal fade" id="addProject" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">New</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <AddProject closeModal={closeModalAdd} />
              </div>
              <div className="modal-footer">
                <button ref={closeButtonAdd} onClick={resfresh} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="edit" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Edit</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <EditProject project={updatedItem} closeModal={closeModalEdit} />
              </div>
              <div className="modal-footer">
                <button onClick={resfresh} ref={closeButtonEdit} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default Projects;
