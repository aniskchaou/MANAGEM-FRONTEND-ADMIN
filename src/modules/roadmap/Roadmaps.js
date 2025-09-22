import React, { useEffect, useState, useRef } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Chip, IconButton, Menu, MenuItem, Tooltip, Button } from '@mui/material';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Roadmaps = () => {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('table');
  const [anchorEls, setAnchorEls] = useState({});
  const [updatedItem, setUpdatedItem] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/roadmaps');
      const data = await res.json();
      // Ensure data is always an array
      setRoadmaps(Array.isArray(data) ? data : []);
    } catch (e) {
      setRoadmaps([]);
    }
    setLoading(false);
  };

  // Actions menu
  const handleMenuOpen = (event, id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: event.currentTarget }));
  };
  const handleMenuClose = (id) => {
    setAnchorEls((prev) => ({ ...prev, [id]: null }));
  };

  // DataGrid columns
  const columns = [
    { field: 'roadmapId', headerName: 'ID', width: 100 },
    { field: 'portfolio', headerName: 'Portfolio', width: 180 },
    { field: 'lastUpdated', headerName: 'Last Updated', width: 140, renderCell: (params) => (
      <Chip label={params.value ? new Date(params.value).toLocaleString() : ''} color="info" size="small" />
    ) },
    { field: 'overallStatus', headerName: 'Status', width: 120, renderCell: (params) => (
      <Chip label={params.value} color={params.value === 'On Track' ? 'success' : params.value === 'Delayed' ? 'warning' : 'default'} size="small" />
    ) },
    { field: 'progressPercentage', headerName: 'Progress', width: 100 },
    { field: 'resourceAllocation', headerName: 'Resources', width: 160, renderCell: (params) => (
      <span>Dev: {params.value?.dev ?? 0}, QA: {params.value?.qa ?? 0}, PM: {params.value?.pm ?? 0}</span>
    ) },
    { field: 'aiInsights', headerName: 'AI Insights', width: 180, renderCell: (params) => (
      <span>{params.value?.suggestion ?? ''}</span>
    ) },
    { field: 'auditLog', headerName: 'Audit Log', width: 180, renderCell: (params) => (
      <span>{Array.isArray(params.value) ? params.value.map(log => `${log.action} by ${log.user} (${new Date(log.date).toLocaleDateString()})`).join(', ') : ''}</span>
    ) },
    { field: 'createdAt', headerName: 'Created At', width: 140, renderCell: (params) => (
      <span>{params.value ? new Date(params.value).toLocaleString() : ''}</span>
    ) },
    { field: 'updatedAt', headerName: 'Updated At', width: 140, renderCell: (params) => (
      <span>{params.value ? new Date(params.value).toLocaleString() : ''}</span>
    ) },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMenuOpen(e, params.row.roadmapId); }}>
            <MoreVertIcon fontSize="small" />
          </IconButton>
          <Menu
            anchorEl={anchorEls[params.row.roadmapId]}
            open={Boolean(anchorEls[params.row.roadmapId])}
            onClose={() => handleMenuClose(params.row.roadmapId)}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => { handleMenuClose(params.row.roadmapId); setUpdatedItem(params.row); }}>View Details</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.roadmapId); setUpdatedItem(params.row); }}>Edit</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(params.row.roadmapId); alert('Delete: ' + (params.row.portfolio || params.row.roadmapId)); }}>Delete</MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  // Card/Grid View
  const CardGridView = () => {
    const filtered = filteredRoadmaps();
    if (filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No roadmaps" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No roadmaps found</div>
      </div>;
    }
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, height: 430, overflowY: 'auto', padding: 8 }}>
        {filtered.map(r => (
          <div key={r.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 120, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
            onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #b3d1f7'}
            onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #ddd'}
          >
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontWeight: 600, fontSize: 16, flex: 1 }}>{r.name}</span>
              <Chip label={r.status} size="small" style={{ marginLeft: 8 }} />
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Owner: {r.owner || '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Start: {r.startDate ? new Date(r.startDate).toLocaleDateString() : '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>End: {r.endDate ? new Date(r.endDate).toLocaleDateString() : '—'}</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 4 }}>Description: {r.description || '—'}</div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <Button size="small" variant="outlined" color="info" onClick={() => setUpdatedItem(r)}>View</Button>
              <Button size="small" variant="outlined" color="primary" onClick={() => setUpdatedItem(r)}>Edit</Button>
              <Button size="small" variant="outlined" color="error" onClick={() => alert('Delete: ' + r.name)}>Delete</Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Tree View: group by owner
  const TreeRoadmapsView = () => {
    const filtered = filteredRoadmaps();
    if (!filtered || filtered.length === 0) {
      return <div style={{ color: '#aaa', textAlign: 'center', height: 430, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <img src="/images/empty.png" alt="No roadmaps" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
        <div>No roadmaps found</div>
      </div>;
    }
    // Group by owner
    const grouped = filtered.reduce((acc, r) => {
      const owner = r.owner || 'No Owner';
      if (!acc[owner]) acc[owner] = [];
      acc[owner].push(r);
      return acc;
    }, {});
    return (
      <div style={{ height: 430, overflowY: 'auto', width: '100%', background: '#fafbfc', borderRadius: 8, padding: 8 }}>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ChevronRightIcon />}
          sx={{ flexGrow: 1, overflowY: 'auto' }}
        >
          {Object.entries(grouped).map(([owner, items]) => (
            <TreeItem key={String(owner)} nodeId={String(owner)} label={<span style={{ fontWeight: 600 }}>Owner: {owner} <span style={{ color: '#888', fontWeight: 400 }}>({items.length})</span></span>}>
              {items.map(r => (
                <TreeItem
                  key={String(r.id)}
                  nodeId={String(owner) + '-' + String(r.id)}
                  label={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between', width: '100%', transition: 'background 0.2s' }}
                      onMouseOver={e => e.currentTarget.style.background = '#e3f0fc'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Chip label={r.status} size="small" />
                        <span style={{ fontWeight: 500 }}>{r.name}</span>
                        <span style={{ color: '#888', fontSize: 12 }}>({r.startDate ? new Date(r.startDate).toLocaleDateString() : '—'} - {r.endDate ? new Date(r.endDate).toLocaleDateString() : '—'})</span>
                      </div>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <Tooltip title="View Details"><IconButton size="small" onClick={() => setUpdatedItem(r)}><i className="fas fa-eye" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Edit"><IconButton size="small" onClick={() => setUpdatedItem(r)}><i className="fas fa-edit" style={{ fontSize: 14 }} /></IconButton></Tooltip>
                        <Tooltip title="Delete"><IconButton size="small" onClick={() => alert('Delete: ' + r.name)}><i className="fas fa-trash" style={{ fontSize: 14, color: '#e53935' }} /></IconButton></Tooltip>
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
  // Filtered roadmaps by search
  const filteredRoadmaps = () => {
    if (!search.trim()) return roadmaps;
    const s = search.toLowerCase();
    return roadmaps.filter(r =>
      (r.name?.toLowerCase().includes(s) ||
        r.owner?.toLowerCase().includes(s) ||
        r.status?.toLowerCase().includes(s))
    );
  };
  // Summary stats
  const total = roadmaps.length;
  const active = roadmaps.filter(r => r.status === 'Active').length;
  const completed = roadmaps.filter(r => r.status === 'Completed').length;

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-road" style={{ marginRight: 10 }}></i> Roadmaps</h4>
          <Tooltip title="This page shows all roadmaps. Use the search bar to filter. Click the + button to add a new roadmap." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, owner, or status..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search roadmaps"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        {/* Roadmap Filters */}
        <div style={{ display: 'flex', gap: 16, marginBottom: 18, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <select style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15 }}><option>Project</option></select>
          <select style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15 }}><option>Team</option></select>
          <select style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15 }}><option>Quarter</option></select>
          <select style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15 }}><option>Status</option></select>
        </div>
        {/* Timeline View (Horizontal Gantt) */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e0e4ea33', padding: 18, marginBottom: 18, minHeight: 220 }}>
          <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, color: '#1976d2' }}><i className="fas fa-stream" style={{ marginRight: 8 }}></i> Timeline View</div>
          <div style={{ display: 'flex', gap: 32, marginBottom: 12 }}>
            <span style={{ fontWeight: 600, color: '#1976d2' }}>Q3 2025</span>
            <span style={{ fontWeight: 600, color: '#43a047' }}>Q4 2025</span>
            <span style={{ fontWeight: 600, color: '#ffa726' }}>Q1 2026</span>
          </div>
          {/* Epics/Features/Milestones/Tasks Hierarchy */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#1976d2' }}>Epic: Alpha CRM Launch</div>
            <div style={{ marginLeft: 18 }}>
              <div style={{ fontWeight: 600, color: '#43a047', marginBottom: 2 }}>Feature: User Onboarding <span style={{ color: '#888', fontWeight: 400 }}>[Owner: John]</span></div>
              <div style={{ marginLeft: 18, marginBottom: 2 }}>
                <span style={{ fontWeight: 500, color: '#43a047' }}>Milestone: Beta Release <span style={{ color: '#888', fontWeight: 400 }}>[Owner: Sarah]</span></span>
                <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, marginTop: 2, marginBottom: 2, width: 180 }}>
                  <div style={{ width: '40%', background: '#ffa726', height: '100%', borderRadius: 4 }}></div>
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>Progress: 40%</span>
              </div>
              <div style={{ marginLeft: 18, marginBottom: 2 }}>
                <span style={{ fontWeight: 500, color: '#43a047' }}>Task: API Integration <span style={{ color: '#888', fontWeight: 400 }}>[Owner: Mike]</span></span>
                <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, marginTop: 2, marginBottom: 2, width: 120 }}>
                  <div style={{ width: '70%', background: '#43a047', height: '100%', borderRadius: 4 }}></div>
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>Progress: 70%</span>
              </div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4, color: '#1976d2' }}>Epic: Beta App Enhancement</div>
            <div style={{ marginLeft: 18 }}>
              <div style={{ fontWeight: 600, color: '#43a047', marginBottom: 2 }}>Feature: Payment Integration <span style={{ color: '#888', fontWeight: 400 }}>[Owner: Mike]</span></div>
              <div style={{ marginLeft: 18, marginBottom: 2 }}>
                <span style={{ fontWeight: 500, color: '#d32f2f' }}>Milestone: Final Release <span style={{ color: '#888', fontWeight: 400 }}>[Owner: Sarah]</span></span>
                <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, marginTop: 2, marginBottom: 2, width: 180 }}>
                  <div style={{ width: '100%', background: '#43a047', height: '100%', borderRadius: 4 }}></div>
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>Progress: 100%</span>
              </div>
              <div style={{ marginLeft: 18, marginBottom: 2 }}>
                <span style={{ fontWeight: 500, color: '#43a047' }}>Task: QA Testing <span style={{ color: '#888', fontWeight: 400 }}>[Owner: Sarah]</span></span>
                <div style={{ height: 8, background: '#e0e0e0', borderRadius: 4, marginTop: 2, marginBottom: 2, width: 120 }}>
                  <div style={{ width: '50%', background: '#ffa726', height: '100%', borderRadius: 4 }}></div>
                </div>
                <span style={{ fontSize: 13, color: '#888' }}>Progress: 50%</span>
              </div>
            </div>
          </div>
          {/* Dependencies (visual placeholder) */}
          <div style={{ marginTop: 12, marginBottom: 8, color: '#888', fontSize: 13 }}>
            <i className="fas fa-link" style={{ marginRight: 6 }}></i> Dependencies: API Integration → Beta Release, QA Testing → Final Release
          </div>
        </div>
        {/* Notes & Comments Panel (Right sidebar) */}
        <div style={{ position: 'absolute', top: 90, right: 18, width: 320, background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #e0e4ea33', padding: 18, minHeight: 220 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: '#1976d2' }}><i className="fa fa-comments" style={{ marginRight: 8 }}></i> Notes & Comments</div>
          <div style={{ fontSize: 14, color: '#888', marginBottom: 8 }}>Collaborative discussion, attach links, docs, and tasks.</div>
          <div style={{ marginBottom: 8 }}><b>@John:</b> Let's review the onboarding flow before Beta Release.</div>
          <div style={{ marginBottom: 8 }}><b>@Sarah:</b> QA Testing needs more resources.</div>
          <div style={{ marginBottom: 8 }}><b>@Mike:</b> Payment integration is ready for final review.</div>
        </div>
        {/* Floating Add Milestone/Feature Button */}
        <Tooltip title="Add Milestone/Feature" arrow>
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
            aria-label="Add Milestone/Feature"
            onClick={() => alert('Add Milestone/Feature (feature coming soon!)')}
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Roadmaps;
