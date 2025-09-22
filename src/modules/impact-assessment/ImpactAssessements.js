import React, { useState } from 'react';

const demoAssessments = [
  {
    id: 1,
    title: 'Scope Change in Alpha CRM',
    type: 'Timeline',
    severity: 'High',
    status: 'Pending',
    owner: 'Sarah',
    date: '2025-09-21',
    trigger: 'Scope Change',
    category: 'Timeline',
    probability: 'Likely',
    score: 16,
    linkedProject: 'Alpha CRM',
    breakdown: {
      timeline: 'Delays milestone by 2 weeks',
      budget: '+ $8,000',
      resources: 'Need 1 extra developer',
      customer: 'Launch delay may reduce satisfaction',
    },
    comments: [
      { author: 'Mike', text: 'Can we mitigate with overtime?' }
    ],
    reviewers: ['Mike', 'John'],
    audit: [
      { date: '2025-09-21', action: 'Created', by: 'Sarah' },
      { date: '2025-09-22', action: 'Reviewed', by: 'Mike' },
    ],
  },
  {
    id: 2,
    title: 'Resource Shift – Beta App',
    type: 'Resource',
    severity: 'Medium',
    status: 'Approved',
    owner: 'John',
    date: '2025-09-20',
    trigger: 'Resource Shift',
    category: 'Resource',
    probability: 'Possible',
    score: 10,
    linkedProject: 'Beta App',
    breakdown: {
      timeline: 'No impact',
      budget: '+ $2,000',
      resources: 'Reassigned 2 developers',
      customer: 'No impact',
    },
    comments: [],
    reviewers: ['Sarah'],
    audit: [
      { date: '2025-09-20', action: 'Created', by: 'John' },
      { date: '2025-09-21', action: 'Approved', by: 'Sarah' },
    ],
  },
  {
    id: 3,
    title: 'Budget Overrun – Gamma Site',
    type: 'Financial',
    severity: 'Critical',
    status: 'Review',
    owner: 'Mike',
    date: '2025-09-19',
    trigger: 'Budget Overrun',
    category: 'Financial',
    probability: 'Almost Certain',
    score: 18,
    linkedProject: 'Gamma Site',
    breakdown: {
      timeline: 'Delays milestone by 3 weeks',
      budget: '+ $15,000',
      resources: 'Need 2 extra developers',
      customer: 'Launch delay may reduce satisfaction',
    },
    comments: [
      { author: 'Sarah', text: 'Critical for client review.' }
    ],
    reviewers: ['Sarah', 'John'],
    audit: [
      { date: '2025-09-19', action: 'Created', by: 'Mike' },
      { date: '2025-09-20', action: 'Reviewed', by: 'Sarah' },
    ],
  },
];

const severityColor = {
  'Low': '#43a047',
  'Medium': '#ffb300',
  'High': '#e53935',
  'Critical': '#8e0000',
};

const ImpactAssessements = () => {
  const [assessments] = useState(demoAssessments);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(demoAssessments[0]);

  // Filtered assessments
  const filtered = assessments.filter(a => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = a.title.toLowerCase().includes(s) || a.owner.toLowerCase().includes(s) || a.type.toLowerCase().includes(s);
    }
    if (filterProject) match = match && a.linkedProject === filterProject;
    if (filterType) match = match && a.type === filterType;
    if (filterSeverity) match = match && a.severity === filterSeverity;
    if (filterDate) match = match && a.date === filterDate;
    return match;
  });

  // Heatmap demo (static)
  const heatmap = [
    ['Rare', 'Possible', 'Likely', 'Almost Certain'],
    ['Low', 'Medium', 'High', 'Critical'],
  ];

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1200, margin: '40px auto' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-balance-scale" style={{ marginRight: 10 }}></i> Impact Assessments</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Project</option>
            {assessments.map(a => <option key={a.id} value={a.linkedProject}>{a.linkedProject}</option>)}
          </select>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Type</option>
            <option value="Financial">Financial</option>
            <option value="Resource">Resource</option>
            <option value="Timeline">Timeline</option>
            <option value="Risk">Risk</option>
            <option value="Customer Impact">Customer Impact</option>
          </select>
          <select value={filterSeverity} onChange={e => setFilterSeverity(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Severity</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search assessments" />
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-excel"></i> Export Excel</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Summary</button>
        </div>
      </div>
      {/* Dashboard Table */}
      <div className="card-body" style={{ padding: 32 }}>
        <div style={{ marginBottom: 18, fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total Assessments: {filtered.length}</span>
        </div>
        <table className="table" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
              <th>Title</th>
              <th>Type</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Owner</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} style={{ cursor: 'pointer', borderLeft: `6px solid ${severityColor[a.severity]}` }} onClick={() => setSelected(a)}>
                <td>{a.title}</td>
                <td>{a.type}</td>
                <td><span style={{ color: severityColor[a.severity], fontWeight: 600 }}>{a.severity}</span></td>
                <td>{a.status}</td>
                <td>{a.owner}</td>
                <td>{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Assessment Detail View */}
        {selected && (
          <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24, display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selected.title}</h5>
              <div style={{ marginBottom: 8 }}><b>Owner:</b> {selected.owner} | <b>Date:</b> {selected.date} | <b>Project:</b> {selected.linkedProject}</div>
              <div style={{ marginBottom: 8 }}><b>Severity:</b> <span style={{ color: severityColor[selected.severity], fontWeight: 600 }}>{selected.severity}</span> | <b>Likelihood:</b> {selected.probability} | <b>Score:</b> {selected.score}/20</div>
              {/* Impact Breakdown Tabs */}
              <div style={{ marginTop: 18, marginBottom: 8, fontWeight: 600 }}>Impact Breakdown:</div>
              <div style={{ display: 'flex', gap: 18 }}>
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                  <b>Timeline</b><br />{selected.breakdown.timeline}
                </div>
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                  <b>Budget</b><br />{selected.breakdown.budget}
                </div>
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                  <b>Resources</b><br />{selected.breakdown.resources}
                </div>
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                  <b>Customer</b><br />{selected.breakdown.customer}
                </div>
              </div>
              {/* Visualization Panel */}
              <div style={{ marginTop: 18 }}>
                <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Visualization</h6>
                <div style={{ display: 'flex', gap: 18 }}>
                  <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 220 }}>
                    <b>Heatmap (Demo)</b>
                    <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 4 }}>
                      {heatmap[1].map((sev, i) => heatmap[0].map((prob, j) => (
                        <div key={sev+prob} style={{ background: severityColor[sev], color: '#fff', borderRadius: 4, padding: '6px 8px', fontSize: 13, textAlign: 'center', opacity: (selected.severity === sev && selected.probability === prob) ? 1 : 0.5 }}>
                          {sev} / {prob}
                        </div>
                      )))}
                    </div>
                  </div>
                  <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 220 }}>
                    <b>Gantt Overlay (Demo)</b>
                    <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>[Demo] Milestone shift visualized here.</div>
                  </div>
                  <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 220 }}>
                    <b>Budget/Resource Chart (Demo)</b>
                    <div style={{ marginTop: 8, color: '#888', fontSize: 13 }}>[Demo] Before vs. After chart here.</div>
                  </div>
                </div>
              </div>
              {/* Actions */}
              <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
                <button className="btn btn-outline-success btn-sm">Approve</button>
                <button className="btn btn-outline-warning btn-sm">Mitigate</button>
                <button className="btn btn-outline-danger btn-sm">Archive</button>
              </div>
            </div>
            {/* Sidebar (Collaboration, Audit, Premium) */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Reviewers</h6>
              <div style={{ marginBottom: 8 }}>{selected.reviewers.map((r, i) => (
                <span key={i} style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 6, padding: '2px 8px', marginRight: 6, fontSize: 13 }}>{r}</span>
              ))}</div>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Comments</h6>
              <div style={{ background: '#f5f7fa', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 8, minHeight: 40 }}>
                {selected.comments.map((c, i) => (
                  <div key={i} style={{ marginBottom: 6, color: '#1976d2' }}><i className="fas fa-comment" style={{ marginRight: 6 }}></i> {c.text}</div>
                ))}
              </div>
              <h6 style={{ fontWeight: 600, marginBottom: 8, marginTop: 12 }}>Audit Trail</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{selected.audit.map((a, i) => (
                <div key={i}>{a.date}: {a.action} by {a.by}</div>
              ))}</div>
              <h6 style={{ fontWeight: 600, marginBottom: 8, marginTop: 12 }}>Premium Features</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI-powered what-if simulations, scenario comparison, portfolio impact view.</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] Export impact reports with charts.</div>
            </div>
          </div>
        )}
      </div>
      {/* Floating Add Button */}
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
        aria-label="Add Impact Assessment"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default ImpactAssessements;
