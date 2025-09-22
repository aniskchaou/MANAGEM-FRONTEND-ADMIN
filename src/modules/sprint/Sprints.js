import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Chip, IconButton, Menu, MenuItem, Tooltip, Button, Box } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Sprints = () => {
  // Demo data for sprints
  const demoSprints = [
    {
      id: 21,
      name: 'Sprint 21 – Alpha',
      status: 'Active',
      startDate: '2025-09-22',
      endDate: '2025-10-05',
      goal: 'Release onboarding flow and dashboard fixes',
      velocity: 35,
      team: 'Alpha',
      epics: [
        {
          id: 1,
          name: 'User Onboarding',
          tasks: [
            { id: 1, name: 'Login Error Fix', assignee: 'John', points: 3, priority: 'High', status: 'To Do', dependencies: [], comments: [], subtasks: [] },
            { id: 2, name: 'API Integration', assignee: 'Sarah', points: 5, priority: 'Medium', status: 'In Progress', dependencies: [], comments: [], subtasks: [] },
            { id: 3, name: 'Feature Review', assignee: 'Mike', points: 2, priority: 'Low', status: 'In Review', dependencies: [], comments: [], subtasks: [] },
            { id: 4, name: 'Bug Fix 101', assignee: 'Sarah', points: 1, priority: 'High', status: 'Done', dependencies: [], comments: [], subtasks: [] },
          ],
        },
        {
          id: 2,
          name: 'Dashboard Enhancements',
          tasks: [
            { id: 5, name: 'Dashboard Fixes', assignee: 'Mike', points: 4, priority: 'Medium', status: 'In Review', dependencies: [], comments: [], subtasks: [] },
          ],
        },
      ],
    },
    {
      id: 22,
      name: 'Sprint 22 – Beta',
      status: 'Planned',
      startDate: '2025-10-06',
      endDate: '2025-10-19',
      goal: 'Integrate payment gateway and finalize roadmap',
      velocity: 40,
      team: 'Beta',
      epics: [
        {
          id: 3,
          name: 'Payment Gateway',
          tasks: [
            { id: 6, name: 'Payment Setup', assignee: 'Sarah', points: 6, priority: 'High', status: 'In Progress', dependencies: [], comments: [], subtasks: [] },
          ],
        },
      ],
    },
    {
      id: 20,
      name: 'Sprint 20 – Gamma',
      status: 'Completed',
      startDate: '2025-09-08',
      endDate: '2025-09-21',
      goal: 'Bug fixes and performance improvements',
      velocity: 32,
      team: 'Gamma',
      epics: [
        {
          id: 4,
          name: 'Bug Fixes',
          tasks: [
            { id: 7, name: 'Bug Fix 101', assignee: 'Sarah', points: 2, priority: 'High', status: 'Done', dependencies: [], comments: [], subtasks: [] },
          ],
        },
      ],
    },
  ];

  const [sprints, setSprints] = useState(demoSprints);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('dashboard');
  const [search, setSearch] = useState('');
  const [anchorEls, setAnchorEls] = useState({});
  const [filterProject, setFilterProject] = useState('');
  const [filterSprint, setFilterSprint] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterTeam, setFilterTeam] = useState('');
  const [selectedSprint, setSelectedSprint] = useState(null);
  const [boardViewSprint, setBoardViewSprint] = useState(demoSprints[0]);

  // Actions menu
  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  // Summary stats
  const totalSprints = sprints.length;
  const completedSprints = sprints.filter(s => s.status === 'Completed').length;
  const activeSprints = sprints.filter(s => s.status === 'Active').length;

  // Filtered sprints
  const filteredSprints = sprints.filter(sprint => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = sprint.name?.toLowerCase().includes(s) || sprint.status?.toLowerCase().includes(s) || sprint.goal?.toLowerCase().includes(s);
    }
    if (filterProject) match = match && sprint.team === filterProject;
    if (filterSprint) match = match && sprint.name === filterSprint;
    if (filterStatus) match = match && sprint.status === filterStatus;
    if (filterTeam) match = match && sprint.team === filterTeam;
    return match;
  });

  // DataGrid columns
  const columns = [
    { field: 'name', headerName: 'Name', width: 180 },
    { field: 'status', headerName: 'Status', width: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'Completed' ? 'success' : params.value === 'Active' ? 'primary' : 'default'} size="small" />
    ) },
    { field: 'startDate', headerName: 'Start Date', width: 120, renderCell: (params) => (
      <Chip label={params.value ? new Date(params.value).toLocaleDateString() : ''} color="info" size="small" />
    ) },
    { field: 'endDate', headerName: 'End Date', width: 120, renderCell: (params) => (
      <Chip label={params.value ? new Date(params.value).toLocaleDateString() : ''} color="warning" size="small" />
    ) },
    { field: 'goal', headerName: 'Goal', width: 200 },
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
            <MenuItem onClick={() => { handleMenuClose(params.row.id); alert('Edit: ' + params.row.name); }}>Edit</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.id); alert('Delete: ' + params.row.name); }}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Tree View: Sprints -> Epics -> Tasks -> Subtasks (mocked for now)
  const TreeSprintsView = () => {
    if (!sprints || sprints.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>No sprints found</div>;
    }
    return (
      <div style={{ height: 430, overflowY: 'auto', width: '100%', background: '#fafbfc', borderRadius: 8, padding: 8 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowY: 'auto' }}
        >
          {sprints.map((sprint) => (
            <TreeItem key={sprint.id} nodeId={String(sprint.id)} label={<span style={{ fontWeight: 600 }}>{sprint.name} <span style={{ color: '#888', fontWeight: 400 }}>({sprint.status})</span></span>}>
              {/* Epics */}
              {(sprint.epics || []).map((epic) => (
                <TreeItem key={epic.id} nodeId={sprint.id + '-epic-' + epic.id} label={<span style={{ fontWeight: 500, color: '#1976d2' }}>{epic.name}</span>}>
                  {/* Tasks */}
                  {(epic.tasks || []).map((task) => (
                    <TreeItem key={task.id} nodeId={sprint.id + '-epic-' + epic.id + '-task-' + task.id} label={<span style={{ fontWeight: 400, color: '#43a047' }}>{task.name}</span>}>
                      {/* Subtasks */}
                      {(task.subtasks || []).map((subtask) => (
                        <TreeItem key={subtask.id} nodeId={sprint.id + '-epic-' + epic.id + '-task-' + task.id + '-subtask-' + subtask.id} label={<span style={{ fontWeight: 400, color: '#ff9800' }}>{subtask.name}</span>} />
                      ))}
                    </TreeItem>
                  ))}
                </TreeItem>
              ))}
            </TreeItem>
          ))}
        </TreeView>
      </div>
    );
  };

  // Card/Grid View (simple)
  const CardGridView = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, height: 430, overflowY: 'auto', padding: 8 }}>
      {sprints.map(sprint => (
        <div key={sprint.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 120 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{sprint.name}</span>
            <Chip label={sprint.status} size="small" style={{ marginLeft: 8 }} />
          </div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Goal: {sprint.goal || '—'}</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Start: {sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '—'}</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>End: {sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : '—'}</div>
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <Button size="small" variant="outlined" color="info" onClick={() => alert('View details for: ' + sprint.name)}>View</Button>
            <Button size="small" variant="outlined" color="primary" onClick={() => alert('Edit: ' + sprint.name)}>Edit</Button>
            <Button size="small" variant="outlined" color="error" onClick={() => alert('Delete: ' + sprint.name)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fa fa-bolt" style={{ marginRight: 10 }}></i> Sprints</h4>
          <Tooltip title="Sprint dashboard: planning, board, analytics, export, AI planning." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Project</option>
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Gamma">Gamma</option>
          </select>
          <select value={filterSprint} onChange={e => setFilterSprint(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Sprint</option>
            {sprints.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Planned">Planned</option>
            <option value="Completed">Completed</option>
          </select>
          <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Team</option>
            <option value="Alpha">Alpha</option>
            <option value="Beta">Beta</option>
            <option value="Gamma">Gamma</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }}
            aria-label="Search sprints"
          />
        </div>
      </div>
      {/* Dashboard Summary & Actions */}
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total: {totalSprints}</span>
          <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> Completed: {completedSprints}</span>
          <span><i className="fas fa-bolt" style={{ marginRight: 6, color: '#1976d2' }}></i> Active: {activeSprints}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="contained" color="primary" size="small"><i className="far fa-plus-square"></i> New Sprint</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-filter"></i> Filter</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export"></i> Export PDF</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel"></i> Export Excel</Button>
          <Button variant="outlined" color="info" size="small"><i className="fas fa-robot"></i> AI Planning</Button>
          <span style={{ fontStyle: 'italic', color: '#888', fontSize: 14 }}>
            "Sprint 21: Recommend moving 'Feature Review' to next sprint due to capacity."
          </span>
        </div>
        {/* Sprints Table */}
        <div style={{ marginBottom: 24 }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
            <thead>
              <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                <td>Sprint Name</td>
                <td>Duration</td>
                <td>Velocity</td>
                <td>Status</td>
              </tr>
            </thead>
            <tbody>
              {filteredSprints.map(s => (
                <tr key={s.id} style={{ cursor: 'pointer' }} onClick={() => setBoardViewSprint(s)}>
                  <td>{s.name}</td>
                  <td>{s.startDate} – {s.endDate}</td>
                  <td>{s.velocity} pts</td>
                  <td><Chip label={s.status} color={s.status === 'Completed' ? 'success' : s.status === 'Active' ? 'primary' : 'default'} size="small" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Sprint Board View (Kanban) */}
        <div style={{ marginBottom: 32 }}>
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Sprint Board: {boardViewSprint.name}</h5>
          <div style={{ display: 'flex', gap: 18, background: '#f5f7fa', borderRadius: 8, padding: 12, boxShadow: '0 2px 8px #e0e4ea33' }}>
            {['To Do', 'In Progress', 'In Review', 'Done'].map(col => (
              <div key={col} style={{ flex: 1, minWidth: 180 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{col}</div>
                {boardViewSprint.epics.flatMap(e => e.tasks.filter(t => t.status === col)).map(task => (
                  <div key={task.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 8, padding: 10, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ fontWeight: 600 }}>{task.name}</div>
                    <div style={{ fontSize: 13, color: '#888' }}>Assignee: <b>{task.assignee}</b></div>
                    <div style={{ fontSize: 13, color: '#888' }}>Points: <b>{task.points}</b> | Priority: <b>{task.priority}</b></div>
                    <Button size="small" variant="outlined" color="info" style={{ marginTop: 4 }}>Assign</Button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ fontSize: 13, color: '#888', marginTop: 8 }}>
            <i className="fas fa-arrows-alt"></i> Drag & drop tasks between columns (demo only)
          </div>
        </div>
        {/* Sprint Progress Panel */}
        <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24 }}>
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Sprint Progress</h5>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <div style={{ marginBottom: 8 }}><b>Goal:</b> {boardViewSprint.goal}</div>
              <div style={{ marginBottom: 8 }}><b>Velocity:</b> {boardViewSprint.velocity} pts</div>
              <div style={{ marginBottom: 8 }}><b>Completed Tasks:</b> {boardViewSprint.epics.flatMap(e => e.tasks).filter(t => t.status === 'Done').length}</div>
              <div style={{ marginBottom: 8 }}><b>Blocked Tasks:</b> 0</div>
              <div style={{ marginBottom: 8 }}><b>Overdue Tasks:</b> 0</div>
              <div style={{ marginBottom: 8 }}><b>Completion %:</b> {Math.round((boardViewSprint.epics.flatMap(e => e.tasks).filter(t => t.status === 'Done').length / boardViewSprint.epics.flatMap(e => e.tasks).length) * 100)}%</div>
            </div>
            <div style={{ flex: 3 }}>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
                <h6 style={{ fontWeight: 600 }}>Burndown Chart</h6>
                <div style={{ height: 120, background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
                  [Demo] Burndown chart: 35 → 0 pts
                </div>
                <div style={{ fontSize: 13, color: '#888' }}>[Demo] Line graph: Remaining story points over sprint days.</div>
              </div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
                <h6 style={{ fontWeight: 600 }}>Notifications & Alerts</h6>
                <div style={{ fontSize: 13, color: '#e53935' }}>[Demo] No blocked or overdue items.</div>
                <div style={{ fontSize: 13, color: '#1976d2' }}>[Demo] Task reassignment: 'API Integration' → Sarah</div>
              </div>
            </div>
          </div>
        </div>
        {/* Reporting & Analytics */}
        <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24 }}>
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Sprint Analytics & Retrospective</h5>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Velocity Chart</div>
              <div style={{ height: 80, background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
                [Demo] Velocity: Planned vs. Completed
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Compare planned vs. completed story points.</div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Retrospective Data</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Blocked items: 0</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Velocity trends: Stable</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Historical sprint performance insights for resource planning.</div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] AI-assisted sprint planning: recommend backlog items based on priority, capacity, and past velocity.</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Integration with roadmaps, epics, milestones.</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Cross-sprint dependency visualization.</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export"></i> Export PDF</Button>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel"></i> Export Excel</Button>
          </div>
        </div>
        {/* Floating New Sprint Button */}
        <Tooltip title="New Sprint" arrow>
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
            aria-label="New Sprint"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sprints;
