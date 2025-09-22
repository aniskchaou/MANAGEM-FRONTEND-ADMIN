import React, { useEffect, useRef, useState } from 'react';
import './MileStones.css';
import { LinearProgress, Chip, IconButton, Menu, MenuItem, Tooltip, Button, Select, FormControl, InputLabel } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const Milestones = () => {
  // Demo milestone data
  const demoMilestones = [
    {
      id: 1,
      title: 'Alpha CRM Launch',
      description: 'Launch CRM for Alpha project',
      projectId: 'Alpha',
      owner: 'John',
      status: 'On Track',
      startDate: '2025-09-01',
      dueDate: '2025-09-30',
      completionPercentage: 70,
      dependencies: [],
      stakeholders: ['John', 'Sarah'],
      comments: [],
      attachments: [],
    },
    {
      id: 2,
      title: 'Beta App Payment Integration',
      description: 'Integrate payment for Beta app',
      projectId: 'Beta',
      owner: 'Sarah',
      status: 'At Risk',
      startDate: '2025-09-15',
      dueDate: '2025-10-15',
      completionPercentage: 40,
      dependencies: [1],
      stakeholders: ['Sarah', 'Mike'],
      comments: [],
      attachments: [],
    },
    {
      id: 3,
      title: 'Gamma Site Deployment',
      description: 'Deploy Gamma site',
      projectId: 'Gamma',
      owner: 'Mike',
      status: 'Completed',
      startDate: '2025-10-20',
      dueDate: '2025-11-01',
      completionPercentage: 100,
      dependencies: [2],
      stakeholders: ['Mike'],
      comments: [],
      attachments: [],
    },
  ];

  const [view, setView] = useState('table');
  const [anchorEls, setAnchorEls] = useState({});
  const [milestonesList, setMilestones] = useState(demoMilestones);
  const [updatedItem, setUpdatedItem] = useState({});
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState('');
  const [filterOwner, setFilterOwner] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterDateRange, setFilterDateRange] = useState({ from: '', to: '' });
  const [updatedItemId, setUpdatedItemId] = useState('');
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filtered milestones by search and filters
  const filteredMilestones = () => {
    let filtered = milestonesList;
    if (search.trim()) {
      const s = search.toLowerCase();
      filtered = filtered.filter(m =>
        (m.title?.toLowerCase().includes(s) ||
          m.projectId?.toLowerCase().includes(s) ||
          m.status?.toLowerCase().includes(s))
      );
    }
    if (filterProject) filtered = filtered.filter(m => m.projectId === filterProject);
    if (filterOwner) filtered = filtered.filter(m => m.owner === filterOwner);
    if (filterStatus) filtered = filtered.filter(m => m.status === filterStatus);
    if (filterDateRange.from) filtered = filtered.filter(m => new Date(m.dueDate) >= new Date(filterDateRange.from));
    if (filterDateRange.to) filtered = filtered.filter(m => new Date(m.dueDate) <= new Date(filterDateRange.to));
    return filtered;
  };

  // Summary stats
  const total = milestonesList.length;
  const completed = milestonesList.filter(m => m.status === 'Completed').length;
  const atRisk = milestonesList.filter(m => m.status === 'At Risk').length;
  const onTrack = milestonesList.filter(m => m.status === 'On Track').length;
  const overdue = milestonesList.filter(m => new Date(m.dueDate) < new Date() && m.status !== 'Completed').length;

  // Actions
  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data);
  };
  const remove = (e, id) => {
    e.preventDefault();
    setMilestones(milestonesList.filter(m => m.id !== id));
  };
  const handleRowSelection = (e) => {
    if (e.length === 1) {
      setUpdatedItemId(e[0]);
      const selected = milestonesList.find(item => item.id === e[0]);
      setUpdatedItem(selected);
    }
    setUpdatedItemIds(e);
  };

  // ...existing code...


  const columns = [
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 250 },
    { field: 'projectId', headerName: 'Project', width: 100 },
    { field: 'owner', headerName: 'Owner', width: 120 },
    { field: 'status', headerName: 'Status', width: 120 },
    {
      field: 'dueDate',
      headerName: 'Due Date',
      width: 120,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    {
      field: 'completionPercentage',
      headerName: 'Progress',
      width: 120,
      renderCell: (params) => (
        <LinearProgress variant="determinate" value={params.value} style={{ height: 8, borderRadius: 4, background: '#eee' }} />
      )
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
        <>
          <Button size="small" onClick={() => setUpdatedItem(params.row)}>View</Button>
          <Button size="small" color="primary" onClick={() => setUpdatedItem(params.row)}>Edit</Button>
          <Button size="small" color="error" onClick={() => remove({ preventDefault: () => {} }, params.row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  // Card/Grid View
  const CardGridView = () => {
    const filtered = filteredMilestones();
    if (filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No milestones" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No milestones found</div>
      </div>;
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, height: 430, overflowY: 'auto', padding: 8 }}>
        {filtered.map(m => (
          <div key={m.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 120, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #b3d1f7'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #ddd'}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{m.title}</span>
              <Chip label={m.status} size="small" style={{ marginLeft: 8, background: m.status === 'On Track' ? '#43a047' : m.status === 'At Risk' ? '#fbc02d' : '#e53935', color: '#fff' }} />
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Project: {m.projectId || '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Owner: {m.owner || '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Due: {m.dueDate ? new Date(m.dueDate).toLocaleDateString() : '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Progress: {m.completionPercentage || 0}%</div>
            <LinearProgress variant="determinate" value={m.completionPercentage} style={{ height: 8, borderRadius: 4, marginBottom: 8, background: '#eee' }} />
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button size="small" variant="outlined" color="info" onClick={() => setUpdatedItem(m)}>View</Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => setUpdatedItem(m)}>Edit</Button>
              <Button size="small" variant="outlined" color="error" onClick={() => remove({ preventDefault: () => {} }, m.id)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Timeline View (simple horizontal bar for demo)
  const TimelineView = () => {
    const filtered = filteredMilestones();
    if (filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 180, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No milestones" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No milestones found</div>
      </div>;
    }
    return (
      <div style={{ padding: 16, background: '#f5f7fa', borderRadius: 8, marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 24, fontWeight: 600, marginBottom: 8 }}>
          <span>Q3 2025</span>
          <span>Q4 2025</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filtered.map(m => (
            <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ minWidth: 180 }}>{m.title}</span>
              <LinearProgress variant="determinate" value={m.completionPercentage} style={{ width: 180, height: 10, borderRadius: 5, background: '#eee' }} />
              <Chip label={m.status} size="small" style={{ background: m.status === 'On Track' ? '#43a047' : m.status === 'At Risk' ? '#fbc02d' : '#e53935', color: '#fff', marginLeft: 8 }} />
              <span style={{ fontSize: 13, color: '#888' }}>{m.dueDate}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tree View: group by projectId
  const TreeMilestonesView = () => {
    const filtered = filteredMilestones();
    if (!filtered || filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No milestones" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No milestones found</div>
      </div>;
    }
    // Group by projectId
    const grouped = filtered.reduce((acc, m) => {
      const pid = m.projectId || 'No Project';
      if (!acc[pid]) acc[pid] = [];
      acc[pid].push(m);
      return acc;
    }, {});
    return (
      <div style={{ height: 430, overflowY: 'auto', width: '100%', background: '#fafbfc', borderRadius: 8, padding: 8 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowY: 'auto' }}
        >
          {Object.entries(grouped).map(([pid, items]) => (
            <TreeItem key={String(pid)} nodeId={String(pid)} label={<span style={{ fontWeight: 600 }}>Project {pid} <span style={{ color: '#888', fontWeight: 400 }}>({items.length})</span></span>}>
              {items.map(m => (
                <TreeItem
                  key={String(m.id)}
                  nodeId={String(pid) + '-' + String(m.id)}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between', width: '100%', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f0fc'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Chip label={m.status} size="small" />
                        <span style={{ fontWeight: 500 }}>{m.title}</span>
                        <span style={{ color: '#888', fontSize: 12 }}>({m.startDate ? new Date(m.startDate).toLocaleDateString() : '—'} - {m.dueDate ? new Date(m.dueDate).toLocaleDateString() : '—'})</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <Tooltip title="View Details"><IconButton size="small" onClick={() => setUpdatedItem(m)}><i className="fas fa-eye" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Edit"><IconButton size="small" onClick={() => setUpdatedItem(m)}><i className="fas fa-edit" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" onClick={() => remove({ preventDefault: () => {} }, m.id)}><i className="fas fa-trash" style={{ fontSize: 14, color: '#e53935' }} /></IconButton></Tooltip>
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

  // Actions menu (future)

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-flag-checkered" style={{ marginRight: 10 }}></i> Milestones</h4>
          <Tooltip title="This page shows all milestones. Use the filters and search bar. Click the + button to add a new milestone." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 420, display: 'flex', alignItems: 'center', gap: 8 }}>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Project</InputLabel>
            <Select native value={filterProject} onChange={e => setFilterProject(e.target.value)} label="Project">
              <option value="">All</option>
              <option value="Alpha">Alpha</option>
              <option value="Beta">Beta</option>
              <option value="Gamma">Gamma</option>
            </Select>
          </FormControl>
          <FormControl size="small" style={{ minWidth: 100 }}>
            <InputLabel>Owner</InputLabel>
            <Select native value={filterOwner} onChange={e => setFilterOwner(e.target.value)} label="Owner">
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
              <option value="On Track">On Track</option>
              <option value="At Risk">At Risk</option>
              <option value="Completed">Completed</option>
            </Select>
          </FormControl>
          <input
            type="date"
            value={filterDateRange.from}
            onChange={e => setFilterDateRange({ ...filterDateRange, from: e.target.value })}
            style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 120 }}
            aria-label="From date"
          />
          <input
            type="date"
            value={filterDateRange.to}
            onChange={e => setFilterDateRange({ ...filterDateRange, to: e.target.value })}
            style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 120 }}
            aria-label="To date"
          />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }}
            aria-label="Search milestones"
          />
        </div>
      </div>

      <div className="card-body" style={{ padding: 24 }}>
        {/* Dashboard summary */}
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total: {total}</span>
          <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#43a047' }}></i> On Track: {onTrack}</span>
          <span><i className="fas fa-exclamation-triangle" style={{ marginRight: 6, color: '#fbc02d' }}></i> At Risk: {atRisk}</span>
          <span><i className="fas fa-bolt" style={{ marginRight: 6, color: '#1976d2' }}></i> Completed: {completed}</span>
          <span><i className="fas fa-clock" style={{ marginRight: 6, color: '#e53935' }}></i> Overdue: {overdue}</span>
        </div>
        {/* Export & AI summary */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export" style={{ marginRight: 6 }}></i> Export PDF</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel" style={{ marginRight: 6 }}></i> Export Excel</Button>
          <Button variant="outlined" color="info" size="small"><i className="fas fa-robot" style={{ marginRight: 6 }}></i> AI Summary</Button>
          <span style={{ fontStyle: 'italic', color: '#888', fontSize: 14 }}>
            "3 milestones at risk this month due to resource allocation."
          </span>
        </div>
        {/* View Switcher */}
        <div className="btn-group ml-2 mb-2" role="group" aria-label="View Switcher" style={{ marginBottom: 10 }}>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'table' ? ' active' : ''}`} onClick={() => setView('table')}><i className="fas fa-list"></i> Table</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'card' ? ' active' : ''}`} onClick={() => setView('card')}><i className="fas fa-th-large"></i> Cards</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'timeline' ? ' active' : ''}`} onClick={() => setView('timeline')}><i className="fas fa-stream"></i> Timeline</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'tree' ? ' active' : ''}`} onClick={() => setView('tree')}><i className="fas fa-sitemap"></i> Tree</button>
        </div>

        <Button variant="contained" color="success" size="small" style={{ marginBottom: 10 }}>
          <i className="far fa-plus-square"></i> Add Milestone
        </Button>

        {/* Floating Add Milestone Button */}
        <Tooltip title="Add Milestone" arrow>
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
            aria-label="Add Milestone"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>

        {loading ? <LinearProgress /> : (
          <>
            {view === 'table' && (
              <div style={{ height: 430, width: '100%' }}>
                <DataGrid
                  rows={filteredMilestones()}
                  getRowId={(row) => row.id}
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
            {view === 'timeline' && <TimelineView />}
            {view === 'tree' && <TreeMilestonesView />}
          </>
        )}

        {/* Details/Collaboration Panel (static UI) */}
        {updatedItem && updatedItem.id && (
          <div style={{ marginTop: 24, background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33' }}>
            <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Milestone Details</h5>
            <div><b>Title:</b> {updatedItem.title}</div>
            <div><b>Description:</b> {updatedItem.description}</div>
            <div><b>Project:</b> {updatedItem.projectId}</div>
            <div><b>Owner:</b> {updatedItem.owner}</div>
            <div><b>Status:</b> <Chip label={updatedItem.status} size="small" style={{ background: updatedItem.status === 'On Track' ? '#43a047' : updatedItem.status === 'At Risk' ? '#fbc02d' : '#e53935', color: '#fff' }} /></div>
            <div><b>Due Date:</b> {updatedItem.dueDate}</div>
            <div><b>Progress:</b> <LinearProgress variant="determinate" value={updatedItem.completionPercentage} style={{ height: 8, borderRadius: 4, background: '#eee', width: 120, display: 'inline-block' }} /> {updatedItem.completionPercentage}%</div>
            <div style={{ marginTop: 12 }}><b>Comments:</b> <span style={{ color: '#888' }}>[Demo] No comments yet.</span></div>
            <div><b>Attachments:</b> <span style={{ color: '#888' }}>[Demo] No attachments.</span></div>
            <div style={{ marginTop: 12 }}>
              <Button size="small" color="info" variant="outlined" style={{ marginRight: 8 }}>Add Comment</Button>
              <Button size="small" color="primary" variant="outlined">Add Attachment</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Milestones;
