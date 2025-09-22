import React, { useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { LinearProgress, Chip, Button, Tooltip, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem } from '@mui/material';


// CSV Export function
function handleExportCSV(data) {
  const csvRows = [];
  // Add header
  csvRows.push('ID,Title,Category,Status,Likelihood,Impact,Score,Tags');
  // Add data rows
  data.forEach(risk => {
    csvRows.push([
      risk.id,
      '"' + risk.title.replace(/"/g, '""') + '"',
      risk.category,
      risk.status,
      risk.likelihood,
      risk.impact,
      risk.score,
      '"' + (risk.tags ? risk.tags.join(';') : '') + '"'
    ].join(','));
  });
  const csvString = csvRows.join('\n');
  const blob = new Blob([csvString], { type: 'text/csv' });
  // Use browser download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'risks.csv';
  a.click();
  window.URL.revokeObjectURL(url);
}

// Demo risk data
const initialRisks = [
  {
    id: 1,
    name: 'Server downtime',
    category: 'Technical',
    likelihood: 4,
    impact: 5,
    owner: 'Alice',
    status: 'Identified',
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2025-09-10T10:00:00Z',
    mitigation: 'Add failover server',
    response: 'Mitigate',
    score: 20,
    tags: ['critical', 'infra'],
  },
  {
    id: 2,
    name: 'Budget overrun',
    category: 'Financial',
    likelihood: 3,
    impact: 4,
    owner: 'Bob',
    status: 'Mitigation Planned',
    createdAt: '2025-09-02T10:00:00Z',
    updatedAt: '2025-09-11T10:00:00Z',
    mitigation: 'Monthly budget review',
    response: 'Mitigate',
    score: 12,
    tags: ['budget'],
  },
];


const riskCategories = [
  'Technical', 'Financial', 'Resource', 'Compliance', 'External', 'Other'
];

const Risks = () => {
  const [risks, setRisks] = useState(initialRisks);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    category: '',
    likelihood: 1,
    impact: 1,
    owner: '',
    status: 'Identified',
    mitigation: '',
    response: '',
    tags: '',
  });

    // Filter risks by search, category, status
    const filteredRisks = risks.filter(r => {
      const matchesSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.category.toLowerCase().includes(search.toLowerCase()) ||
        r.owner.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = !filterCategory || r.category === filterCategory;
      const matchesStatus = !filterStatus || r.status === filterStatus;
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // DataGrid columns
    const columns = [
      { field: 'name', headerName: 'Risk', width: 180 },
      { field: 'category', headerName: 'Category', width: 120 },
      { field: 'likelihood', headerName: 'Likelihood', width: 110, renderCell: (params) => (
        <Chip label={params.value} color={params.value >= 4 ? 'error' : params.value >= 2 ? 'warning' : 'default'} size="small" />
      ) },
      { field: 'impact', headerName: 'Impact', width: 110, renderCell: (params) => (
        <Chip label={params.value} color={params.value >= 4 ? 'error' : params.value >= 2 ? 'warning' : 'default'} size="small" />
      ) },
      { field: 'score', headerName: 'Score', width: 100, renderCell: (params) => (
        <Chip label={params.value} color={params.value >= 16 ? 'error' : params.value >= 8 ? 'warning' : 'default'} size="small" />
      ) },
      { field: 'owner', headerName: 'Owner', width: 120 },
      { field: 'status', headerName: 'Status', width: 140, renderCell: (params) => (
        <Chip label={params.value} color={params.value === 'Closed' ? 'success' : params.value === 'Mitigation Planned' ? 'primary' : 'default'} size="small" />
      ) },
      { field: 'response', headerName: 'Response', width: 120 },
      { field: 'mitigation', headerName: 'Mitigation', width: 180 },
      { field: 'tags', headerName: 'Tags', width: 120, renderCell: (params) => (
        <div>{params.value.map(tag => <Chip key={tag} label={tag} size="small" style={{ marginRight: 4 }} />)}</div>
      ) },
      { field: 'createdAt', headerName: 'Created At', width: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
      { field: 'updatedAt', headerName: 'Updated At', width: 160, valueFormatter: (params) => new Date(params.value).toLocaleString() },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 140,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <div style={{ display: 'flex', gap: 8 }}>
            <Tooltip title="View Details"><IconButton size="small" color="primary" onClick={() => handleView(params.row)}><i className="fas fa-eye"></i></IconButton></Tooltip>
            <Tooltip title="Edit"><IconButton size="small" color="info" onClick={() => handleEdit(params.row)}><i className="fas fa-edit"></i></IconButton></Tooltip>
            <Tooltip title="Delete"><IconButton size="small" color="error" onClick={() => handleDelete(params.row)}><i className="fas fa-trash-alt"></i></IconButton></Tooltip>
          </div>
        ),
      },
    ];

    // Action handlers (stub)
    const handleView = (risk) => {
      alert(`View details for: ${risk.name}`);
    };
    const handleEdit = (risk) => {
      alert(`Edit risk: ${risk.name}`);
    };
    const handleDelete = (risk) => {
      if (window.confirm(`Delete risk: ${risk.name}?`)) {
        setRisks(risks.filter(r => r.id !== risk.id));
      }
    };

    // Risk Assessment Matrix
    const RiskMatrix = ({ likelihood, impact, setLikelihood, setImpact }) => (
      <div style={{ margin: '32px 0', textAlign: 'center' }}>
        <h6 style={{ fontWeight: 600, marginBottom: 12 }}>Risk Assessment Matrix</h6>
        <div style={{
          maxWidth: 480,
          margin: '0 auto 18px auto',
          background: '#e3f2fd',
          border: '1px solid #90caf9',
          borderRadius: 8,
          padding: '14px 18px',
          color: '#1565c0',
          fontSize: 15,
          textAlign: 'left',
          boxShadow: '0 2px 8px #90caf933',
        }}>
          <b>How does this work?</b><br />
          The Risk Assessment Matrix helps you evaluate a risk by combining <b>Likelihood</b> (chance of happening) and <b>Impact</b> (severity if it happens).<br />
          <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
            <li>Click a cell to select Likelihood and Impact for your risk.</li>
            <li>Score = Likelihood × Impact (1-25).</li>
            <li>Colors: <span style={{ color: '#ff5252', fontWeight: 600 }}>Red</span> = High, <span style={{ color: '#ffd54f', fontWeight: 600 }}>Yellow</span> = Medium, <span style={{ color: '#1976d2', fontWeight: 600 }}>Blue</span> = Low.</li>
            <li>Selected cell is highlighted. See your score below the matrix.</li>
          </ul>
        </div>
        <div style={{ display: 'inline-block', border: '1px solid #e0e4ea', borderRadius: 8, background: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: 12 }}>
          <table style={{ borderCollapse: 'collapse' }}>
            <tbody>
              {[5,4,3,2,1].map(l => (
                <tr key={l}>
                  {[1,2,3,4,5].map(i => {
                    const score = l*i;
                    const isSelected = l === likelihood && i === impact;
                    return (
                      <td
                        key={i}
                        style={{
                          width: 38,
                          height: 38,
                          textAlign: 'center',
                          border: '1px solid #e0e4ea',
                          background: isSelected ? '#1976d2' : score >= 16 ? '#ff5252' : score >= 8 ? '#ffd54f' : '#e0f7fa',
                          color: isSelected ? '#fff' : '#333',
                          fontWeight: 600,
                          cursor: 'pointer',
                          boxShadow: isSelected ? '0 0 0 2px #1976d2' : undefined,
                        }}
                        onClick={() => { setLikelihood(l); setImpact(i); }}
                        title={`Likelihood ${l} × Impact ${i} = ${score}`}
                      >
                        {score}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, fontSize: 15 }}>
            Selected: <b>Likelihood {likelihood}</b> × <b>Impact {impact}</b> = <b>{likelihood * impact}</b>
          </div>
        </div>
      </div>
    );

    // Handle form changes
    const handleFormChange = (e) => {
      const { name, value } = e.target;
      setForm(f => ({ ...f, [name]: value }));
    };

    // Handle risk creation
    const handleCreateRisk = () => {
      const newRisk = {
        id: risks.length ? Math.max(...risks.map(r => r.id)) + 1 : 1,
        name: form.name,
        category: form.category,
        likelihood: Number(form.likelihood),
        impact: Number(form.impact),
        owner: form.owner,
        status: form.status,
        mitigation: form.mitigation,
        response: form.response,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        score: Number(form.likelihood) * Number(form.impact),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setRisks([...risks, newRisk]);
      setOpen(false);
      setForm({
        name: '', category: '', likelihood: 1, impact: 1, owner: '', status: 'Identified', mitigation: '', response: '', tags: '',
      });
    };

    // Matrix state for dialog
    const [matrixLikelihood, setMatrixLikelihood] = useState(1);
    const [matrixImpact, setMatrixImpact] = useState(1);

    return (
      <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1200, margin: '40px auto' }}>
        <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-exclamation-triangle" style={{ marginRight: 10 }}></i> Risk Management</h4>
            <Tooltip title="AI-powered risk suggestions coming soon!" arrow>
              <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-robot"></i></IconButton>
            </Tooltip>
          </div>
          <div style={{ minWidth: 420, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by risk, category, or owner..."
              style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
              aria-label="Search risks"
            />
            <TextField
              label="Category"
              select
              value={filterCategory}
              onChange={e => setFilterCategory(e.target.value)}
              style={{ minWidth: 120 }}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {riskCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
            <TextField
              label="Status"
              select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              style={{ minWidth: 120 }}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {['Identified', 'Mitigation Planned', 'Closed'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <Button variant="outlined" color="primary" size="small" onClick={() => { setFilterCategory(''); setFilterStatus(''); setSearch(''); }}>Reset</Button>
            <Button variant="contained" color="primary" size="small" onClick={() => handleExportCSV(filteredRisks)}>Export CSV</Button>
          </div>
        </div>
        <div className="card-body" style={{ padding: 32 }}>
          <div style={{ display: 'flex', gap: 10, marginBottom: 18, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button variant="outlined" color="primary" size="small" style={{ minWidth: 90 }} onClick={() => setOpen(true)}><i className="far fa-plus-square"></i> Create</Button>
            <Button variant="outlined" color="primary" size="small" style={{ minWidth: 90 }}><i className="fas fa-edit"></i> Edit</Button>
            <Button variant="outlined" color="primary" size="small" style={{ minWidth: 90 }}><i className="fas fa-trash-alt"></i> Remove</Button>
            <Button variant="outlined" color="primary" size="small" style={{ minWidth: 90 }}><i className="fas fa-repeat"></i> Reload</Button>
          </div>
          <RiskMatrix likelihood={matrixLikelihood} impact={matrixImpact} setLikelihood={setMatrixLikelihood} setImpact={setMatrixImpact} />
          {loading ? (
            <LinearProgress />
          ) : (
            <div style={{ height: 430, width: '100%' }}>
              <DataGrid
                rows={filteredRisks}
                getRowId={row => row.id}
                columns={columns}
                pageSize={8}
                rowsPerPageOptions={[8, 16, 32]}
                components={{ Toolbar: GridToolbar }}
                sx={{
                  '& .MuiDataGrid-row:hover': {
                    backgroundColor: '#e3f2fd',
                  },
                  '& .MuiDataGrid-overlay': {
                    background: '#fff',
                    color: '#888',
                    fontSize: 18, fontWeight: 500,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200,
                  },
                }}
                localeText={{
                  noRowsLabel: search ? 'No risks match your search.' : 'No risks found.',
                }}
              />
            </div>
          )}
        </div>
        {/* Risk Creation Dialog */}
        <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle>Add New Risk</DialogTitle>
          <DialogContent>
            <TextField label="Risk Name" name="name" value={form.name} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Category" name="category" value={form.category} onChange={handleFormChange} select fullWidth margin="normal" required>
              {riskCategories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
            </TextField>
            <RiskMatrix likelihood={form.likelihood} impact={form.impact} setLikelihood={l => setForm(f => ({ ...f, likelihood: l }))} setImpact={i => setForm(f => ({ ...f, impact: i }))} />
            <TextField label="Owner" name="owner" value={form.owner} onChange={handleFormChange} fullWidth margin="normal" required />
            <TextField label="Status" name="status" value={form.status} onChange={handleFormChange} select fullWidth margin="normal">
              {['Identified', 'Mitigation Planned', 'Closed'].map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
            <TextField label="Mitigation" name="mitigation" value={form.mitigation} onChange={handleFormChange} fullWidth margin="normal" />
            <TextField label="Response" name="response" value={form.response} onChange={handleFormChange} fullWidth margin="normal" />
            <TextField label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleFormChange} fullWidth margin="normal" />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
            <Button onClick={handleCreateRisk} color="primary" variant="contained">Add Risk</Button>
          </DialogActions>
        </Dialog>
        {/* Floating Add Button */}
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
          aria-label="Add Risk"
          onClick={() => setOpen(true)}
        >
          <i className="fas fa-plus"></i>
        </Button>
      </div>
    );
}

export default Risks;
