import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Chip, IconButton, Tooltip, Button, Select, FormControl, InputLabel } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const demoWorkloads = [
  {
    id: 1,
    user: 'John',
    role: 'Developer',
    team: 'Alpha',
    skill: 'React',
    status: 'Over',
    tasks: 5,
    hours: 40,
    utilization: 120,
    capacity: 40,
    assignedTasks: [
      { name: 'Dashboard Enhancements', project: 'Alpha CRM', status: 'In Progress', hours: 12 },
      { name: 'Payment Gateway Setup', project: 'Beta App', status: 'Not Started', hours: 10 },
      { name: 'User Onboarding Flow', project: 'Alpha CRM', status: 'Completed', hours: 8 },
    ],
  },
  {
    id: 2,
    user: 'Sarah',
    role: 'QA',
    team: 'Beta',
    skill: 'Testing',
    status: 'OK',
    tasks: 3,
    hours: 35,
    utilization: 85,
    capacity: 35,
    assignedTasks: [
      { name: 'API Integration', project: 'Beta App', status: 'In Progress', hours: 10 },
      { name: 'Payment UI', project: 'Beta App', status: 'Not Started', hours: 8 },
    ],
  },
  {
    id: 3,
    user: 'Mike',
    role: 'Designer',
    team: 'Gamma',
    skill: 'UI/UX',
    status: 'OK',
    tasks: 4,
    hours: 38,
    utilization: 95,
    capacity: 40,
    assignedTasks: [
      { name: 'Server Setup', project: 'Gamma Site', status: 'Completed', hours: 10 },
    ],
  },
];

const Workloads = () => {
  const [workloads, setWorkloads] = useState(demoWorkloads);
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [filterProject, setFilterProject] = useState('');
  const [filterSkill, setFilterSkill] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [selectedResource, setSelectedResource] = useState(null);
  const [loading, setLoading] = useState(false);

  // Filtered workloads
  const filteredWorkloads = workloads.filter(w => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = w.user?.toLowerCase().includes(s) || w.role?.toLowerCase().includes(s) || w.status?.toLowerCase().includes(s);
    }
    if (filterTeam) match = match && w.team === filterTeam;
    if (filterProject) match = match && w.assignedTasks.some(t => t.project === filterProject);
    if (filterSkill) match = match && w.skill === filterSkill;
    if (filterStatus) match = match && w.status === filterStatus;
    return match;
  });

  // DataGrid columns
  const columns = [
    { field: 'user', headerName: 'Resource', width: 140 },
    { field: 'tasks', headerName: 'Assigned Tasks', width: 120 },
    { field: 'capacity', headerName: 'Capacity (h)', width: 120 },
    { field: 'utilization', headerName: 'Utilization (%)', width: 120, renderCell: (params) => (
      <span style={{ color: params.value > 100 ? '#e53935' : params.value < 80 ? '#43a047' : '#1976d2', fontWeight: 600 }}>{params.value}%</span>
    ) },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Over' ? 'error' : 'success'} size="small" />
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <Button size="small" variant="outlined" onClick={() => setSelectedResource(params.row)}>View</Button>
      ),
    },
  ];

  // Summary stats
  const totalResources = workloads.length;
  const overloaded = workloads.filter(w => w.status === 'Over').length;
  const ok = workloads.filter(w => w.status === 'OK').length;

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-users" style={{ marginRight: 10 }}></i> Workloads</h4>
          <Tooltip title="Centralized resource overview. Use filters and search. Click View for details." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><InfoOutlinedIcon /></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 520, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Project</InputLabel>
            <Select native value={filterProject} onChange={e => setFilterProject(e.target.value)} label="Project">
              <option value="">All</option>
              <option value="Alpha CRM">Alpha CRM</option>
              <option value="Beta App">Beta App</option>
              <option value="Gamma Site">Gamma Site</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Team</InputLabel>
            <Select native value={filterTeam} onChange={e => setFilterTeam(e.target.value)} label="Team">
              <option value="">All</option>
              <option value="Alpha">Alpha</option>
              <option value="Beta">Beta</option>
              <option value="Gamma">Gamma</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Skill</InputLabel>
            <Select native value={filterSkill} onChange={e => setFilterSkill(e.target.value)} label="Skill">
              <option value="">All</option>
              <option value="React">React</option>
              <option value="Testing">Testing</option>
              <option value="UI/UX">UI/UX</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Status</InputLabel>
            <Select native value={filterStatus} onChange={e => setFilterStatus(e.target.value)} label="Status">
              <option value="">All</option>
              <option value="Over">Over</option>
              <option value="OK">OK</option>
            </Select>
          </FormControl>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }}
            aria-label="Search workloads"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        {/* Dashboard summary */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-users" style={{ marginRight: 6 }}></i> Total Resources: {totalResources}</span>
          <span><i className="fas fa-exclamation-triangle" style={{ marginRight: 6, color: '#e53935' }}></i> Overloaded: {overloaded}</span>
          <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> OK: {ok}</span>
        </div>
        {/* Export & AI summary */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export" style={{ marginRight: 6 }}></i> Export PDF</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel" style={{ marginRight: 6 }}></i> Export Excel</Button>
          <Button variant="outlined" color="info" size="small"><i className="fas fa-robot" style={{ marginRight: 6 }}></i> AI Insights</Button>
          <span style={{ fontStyle: 'italic', color: '#888', fontSize: 14 }}>
            "John is 120% booked this week; consider reassigning tasks."
          </span>
        </div>
        {/* Assign Task Button */}
        <Button variant="contained" color="success" size="small" style={{ marginBottom: 10 }}>
          <i className="far fa-plus-square"></i> Assign Task
        </Button>
        {loading ? <LinearProgress /> : (
          <div style={{ height: 430, width: '100%' }}>
            <DataGrid
              rows={filteredWorkloads}
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
                  ? 'No workloads match your search.'
                  : 'No workloads found. Assign tasks to users to get started!',
              }}
            />
          </div>
        )}
        {/* Workload Details View */}
        {selectedResource && (
          <div style={{ marginTop: 24, background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', display: 'flex', gap: 24 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selectedResource.user} <span style={{ fontWeight: 400, color: '#888', fontSize: 15 }}>({selectedResource.role})</span></h5>
              <div><b>Team:</b> {selectedResource.team}</div>
              <div><b>Skill:</b> {selectedResource.skill}</div>
              <div><b>Capacity:</b> {selectedResource.capacity}h</div>
              <div><b>Utilization:</b> <span style={{ color: selectedResource.utilization > 100 ? '#e53935' : selectedResource.utilization < 80 ? '#43a047' : '#1976d2', fontWeight: 600 }}>{selectedResource.utilization}%</span></div>
              <div><b>Status:</b> <Chip label={selectedResource.status} color={selectedResource.status === 'Over' ? 'error' : 'success'} size="small" /></div>
              {/* Bar chart for hours assigned vs available (simple) */}
              <div style={{ margin: '18px 0', width: 220 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Hours Assigned vs. Available</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 160, height: 18, background: '#eee', borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                    <div style={{ width: `${Math.min(selectedResource.hours / selectedResource.capacity * 100, 100)}%`, height: '100%', background: selectedResource.utilization > 100 ? '#e53935' : '#43a047', borderRadius: 8, transition: 'width 0.3s' }} />
                  </div>
                  <span style={{ fontWeight: 600 }}>{selectedResource.hours}h / {selectedResource.capacity}h</span>
                </div>
              </div>
              <h6 style={{ marginTop: 18, fontWeight: 600 }}>Assigned Tasks</h6>
              <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
                <thead>
                  <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                    <td>Task Name</td>
                    <td>Project</td>
                    <td>Status</td>
                    <td>Hours</td>
                  </tr>
                </thead>
                <tbody>
                  {selectedResource.assignedTasks?.map((task, idx) => (
                    <tr key={idx}>
                      <td>{task.name}</td>
                      <td>{task.project}</td>
                      <td><Chip label={task.status} color={task.status === 'Completed' ? 'success' : task.status === 'In Progress' ? 'primary' : 'default'} size="small" /></td>
                      <td>{task.hours}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div style={{ marginTop: 12 }}>
                <Button size="small" color="info" variant="outlined" style={{ marginRight: 8 }}>Notify</Button>
                <Button size="small" color="primary" variant="outlined" style={{ marginRight: 8 }}>@Mention</Button>
                <Button size="small" color="success" variant="outlined" style={{ marginRight: 8 }}>Reassign</Button>
                <Button size="small" color="error" variant="outlined">Remove</Button>
                <Button size="small" color="primary" variant="outlined" style={{ marginLeft: 8 }}>Export</Button>
              </div>
            </div>
            {/* Analytics & AI Insights */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600 }}>Analytics & Insights</h6>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] Resource utilization report (planned vs. actual).</div>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] Forecast: upcoming capacity needs.</div>
              <div style={{ marginBottom: 8, color: '#888' }}>[Demo] AI: "John is 120% booked this week; consider reassigning tasks."</div>
              <Button size="small" color="info" variant="outlined" style={{ marginRight: 8 }}>Export PDF</Button>
              <Button size="small" color="primary" variant="outlined">Export Excel</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workloads;
