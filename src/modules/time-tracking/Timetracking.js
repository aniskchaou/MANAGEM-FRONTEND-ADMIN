import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Chip, IconButton, Tooltip, Button, Select, FormControl, InputLabel } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const demoEntries = [
  { id: 1, user: 'John', task: 'Dashboard Enhancements', project: 'Alpha CRM', date: '2025-09-22', hours: 2, status: 'Approved', billable: true },
  { id: 2, user: 'John', task: 'Dashboard Enhancements', project: 'Alpha CRM', date: '2025-09-23', hours: 3, status: 'Approved', billable: true },
  { id: 3, user: 'John', task: 'Dashboard Enhancements', project: 'Alpha CRM', date: '2025-09-24', hours: 4, status: 'Approved', billable: true },
  { id: 4, user: 'John', task: 'Dashboard Enhancements', project: 'Alpha CRM', date: '2025-09-25', hours: 3, status: 'Approved', billable: true },
  { id: 5, user: 'Sarah', task: 'Payment Gateway Setup', project: 'Beta App', date: '2025-09-22', hours: 4, status: 'Pending', billable: false },
  { id: 6, user: 'Sarah', task: 'Payment Gateway Setup', project: 'Beta App', date: '2025-09-23', hours: 2, status: 'Pending', billable: false },
  { id: 7, user: 'Sarah', task: 'Payment Gateway Setup', project: 'Beta App', date: '2025-09-24', hours: 3, status: 'Pending', billable: false },
  { id: 8, user: 'Sarah', task: 'Payment Gateway Setup', project: 'Beta App', date: '2025-09-25', hours: 1, status: 'Pending', billable: false },
  { id: 9, user: 'Mike', task: 'User Onboarding Flow', project: 'Alpha CRM', date: '2025-09-22', hours: 2, status: 'Approved', billable: true },
  { id: 10, user: 'Mike', task: 'User Onboarding Flow', project: 'Alpha CRM', date: '2025-09-23', hours: 3, status: 'Approved', billable: true },
  { id: 11, user: 'Mike', task: 'User Onboarding Flow', project: 'Alpha CRM', date: '2025-09-24', hours: 2, status: 'Approved', billable: true },
  { id: 12, user: 'Mike', task: 'User Onboarding Flow', project: 'Alpha CRM', date: '2025-09-25', hours: 1, status: 'Approved', billable: true },
];

const Timetracking = () => {
  const [entries, setEntries] = useState(demoEntries);
  const [search, setSearch] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterTask, setFilterTask] = useState('');
  const [filterResource, setFilterResource] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateFrom, setFilterDateFrom] = useState('');
  const [filterDateTo, setFilterDateTo] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [loading, setLoading] = useState(false);

  // Filtered entries
  const filteredEntries = entries.filter(e => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = e.user?.toLowerCase().includes(s) || e.task?.toLowerCase().includes(s) || e.status?.toLowerCase().includes(s);
    }
    if (filterProject) match = match && e.project === filterProject;
    if (filterTask) match = match && e.task === filterTask;
    if (filterResource) match = match && e.user === filterResource;
    if (filterStatus) match = match && e.status === filterStatus;
    if (filterDateFrom) match = match && e.date >= filterDateFrom;
    if (filterDateTo) match = match && e.date <= filterDateTo;
    return match;
  });

  // DataGrid columns
  const columns = [
    { field: 'user', headerName: 'Resource', width: 140 },
    { field: 'task', headerName: 'Task', width: 180 },
    { field: 'project', headerName: 'Project', width: 140 },
    { field: 'hours', headerName: 'Hours', width: 100 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Approved' ? 'success' : params.value === 'Pending' ? 'warning' : 'default'} size="small" />
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button size="small" variant="outlined" onClick={() => setSelectedTask(params.row)}>View</Button>
      ),
    },
  ];

  // Summary stats
  const totalEntries = entries.length;
  const approved = entries.filter(e => e.status === 'Approved').length;
  const pending = entries.filter(e => e.status === 'Pending').length;
  const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
  const billableHours = entries.filter(e => e.billable).reduce((sum, e) => sum + e.hours, 0);
  const nonBillableHours = entries.filter(e => !e.billable).reduce((sum, e) => sum + e.hours, 0);

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-clock" style={{ marginRight: 10 }}></i> Time Tracking</h4>
          <Tooltip title="Dashboard: filters, timer, export, analytics. Click View for details." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><InfoOutlinedIcon /></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Project</InputLabel>
            <Select native value={filterProject} onChange={e => setFilterProject(e.target.value)} label="Project">
              <option value="">All</option>
              <option value="Alpha CRM">Alpha CRM</option>
              <option value="Beta App">Beta App</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Task</InputLabel>
            <Select native value={filterTask} onChange={e => setFilterTask(e.target.value)} label="Task">
              <option value="">All</option>
              <option value="Dashboard Enhancements">Dashboard Enhancements</option>
              <option value="Payment Gateway Setup">Payment Gateway Setup</option>
              <option value="User Onboarding Flow">User Onboarding Flow</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Resource</InputLabel>
            <Select native value={filterResource} onChange={e => setFilterResource(e.target.value)} label="Resource">
              <option value="">All</option>
              <option value="John">John</option>
              <option value="Sarah">Sarah</option>
              <option value="Mike">Mike</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Status</InputLabel>
            <Select native value={filterStatus} onChange={e => setFilterStatus(e.target.value)} label="Status">
              <option value="">All</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </Select>
          </FormControl>
          <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 120 }} aria-label="From date" />
          <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 120 }} aria-label="To date" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }}
            aria-label="Search time entries"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        {/* Dashboard summary */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total Entries: {totalEntries}</span>
          <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> Approved: {approved}</span>
          <span><i className="fas fa-hourglass-half" style={{ marginRight: 6, color: '#ff9800' }}></i> Pending: {pending}</span>
          <span><i className="fas fa-clock" style={{ marginRight: 6, color: '#1976d2' }}></i> Total Hours: {totalHours}h</span>
          <span><i className="fas fa-dollar-sign" style={{ marginRight: 6, color: '#43a047' }}></i> Billable: {billableHours}h</span>
          <span><i className="fas fa-ban" style={{ marginRight: 6, color: '#e53935' }}></i> Non-billable: {nonBillableHours}h</span>
        </div>
        {/* Export & AI summary */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export" style={{ marginRight: 6 }}></i> Export PDF</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel" style={{ marginRight: 6 }}></i> Export Excel</Button>
          <Button variant="outlined" color="info" size="small"><i className="fas fa-robot" style={{ marginRight: 6 }}></i> AI Insights</Button>
          <span style={{ fontStyle: 'italic', color: '#888', fontSize: 14 }}>
            "Project Alpha CRM exceeds estimated hours by 20%."
          </span>
        </div>
        {/* Timer & Log Time Controls */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="contained" color="success" size="small"><i className="far fa-plus-square"></i> Log Time</Button>
          <Button variant="contained" color={timerRunning ? 'error' : 'primary'} size="small" onClick={() => setTimerRunning(!timerRunning)}>
            <i className="fas fa-stopwatch" style={{ marginRight: 6 }}></i> {timerRunning ? 'Stop Timer' : 'Start Timer'}
          </Button>
          <span style={{ fontWeight: 600, color: timerRunning ? '#e53935' : '#1976d2', fontSize: 16 }}>Timer: {Math.floor(timerSeconds / 60)}m {timerSeconds % 60}s</span>
        </div>
        {/* Main DataGrid */}
        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={filteredEntries}
              getRowId={(row) => row.id}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[6]}
              components={{ Toolbar: GridToolbar }}
              sx={{
                '& .MuiDataGrid-row:hover': {
                  backgroundColor: '#e3f2fd',
                },
                '& .MuiDataGrid-overlay': {
                  background: '#fff',
                  color: '#888',
                  fontSize: 18,
                  fontWeight: 500,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 200,
                },
              }}
              localeText={{
                noRowsLabel: search
                  ? 'No time entries match your search.'
                  : 'No time entries found. Start tracking time to get started!',
              }}
            />
          </div>
        )}
        {/* Timesheet View (static) */}
        <div style={{ marginTop: 32, background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33' }}>
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Timesheet: Sep 22 – Sep 28</h5>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
            <thead>
              <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                <td>Resource</td>
                <td>Mon</td>
                <td>Tue</td>
                <td>Wed</td>
                <td>Thu</td>
                <td>Fri</td>
                <td>Sat</td>
                <td>Sun</td>
              </tr>
            </thead>
            <tbody>
              <tr><td>John</td><td>2h</td><td>3h</td><td>4h</td><td>3h</td><td>0h</td><td>0h</td><td>0h</td></tr>
              <tr><td>Sarah</td><td>4h</td><td>2h</td><td>3h</td><td>1h</td><td>0h</td><td>0h</td><td>0h</td></tr>
              <tr><td>Mike</td><td>2h</td><td>3h</td><td>2h</td><td>1h</td><td>0h</td><td>0h</td><td>0h</td></tr>
            </tbody>
          </table>
        </div>
        {/* Task Detail Panel */}
        {selectedTask && (
          <div style={{ marginTop: 24, background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', display: 'flex', gap: 24 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selectedTask.task}</h5>
              <div><b>Project:</b> {selectedTask.project}</div>
              <div><b>Resource:</b> {selectedTask.user}</div>
              <div><b>Date:</b> {selectedTask.date}</div>
              <div><b>Status:</b> <Chip label={selectedTask.status} color={selectedTask.status === 'Approved' ? 'success' : selectedTask.status === 'Pending' ? 'warning' : 'default'} size="small" /></div>
              <div style={{ margin: '12px 0' }}><b>Estimated vs. Tracked Hours:</b> <LinearProgress variant="determinate" value={selectedTask.hours * 8} style={{ height: 8, borderRadius: 4, background: '#eee', width: 120, display: 'inline-block' }} /> {selectedTask.hours}h / 8h</div>
              <h6 style={{ marginTop: 18, fontWeight: 600 }}>Tracked Time Entries</h6>
              <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
                <thead>
                  <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                    <td>Date</td>
                    <td>Duration</td>
                    <td>Notes</td>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>{selectedTask.date}</td><td>{selectedTask.hours}h</td><td>[Demo] Manual entry</td></tr>
                </tbody>
              </table>
              <div style={{ marginTop: 12 }}>
                <Button size="small" color="info" variant="outlined" style={{ marginRight: 8 }}>{timerRunning ? 'Stop Timer' : 'Start Timer'}</Button>
                <Button size="small" color="primary" variant="outlined" style={{ marginRight: 8 }}>Add Manual Entry</Button>
                <Button size="small" color="success" variant="outlined" style={{ marginRight: 8 }}>Approve</Button>
                <Button size="small" color="error" variant="outlined">Reject</Button>
                <Button size="small" color="primary" variant="outlined" style={{ marginLeft: 8 }}>Export</Button>
              </div>
            </div>
            {/* Analytics & Visualization */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600 }}>Analytics & Visualization</h6>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] Bar chart: Hours tracked per resource/project.</div>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] Pie chart: Billable vs. Non-billable hours.</div>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] Heatmap: Overutilized/underutilized resources.</div>
              <Button size="small" color="info" variant="outlined" style={{ marginRight: 8 }}>Export PDF</Button>
              <Button size="small" color="primary" variant="outlined">Export Excel</Button>
            </div>
          </div>
        )}
      </div>
      {/* Floating Log Time Button */}
      <Tooltip title="Log Time" arrow>
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
          aria-label="Log Time"
        >
          <i className="fas fa-plus"></i>
        </button>
      </Tooltip>
    </div>
  );
};

export default Timetracking;
