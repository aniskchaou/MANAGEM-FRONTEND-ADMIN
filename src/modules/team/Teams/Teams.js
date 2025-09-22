import React, { useState } from 'react';
import { Button, Chip, Tooltip, LinearProgress } from '@mui/material';

const demoTeams = [
  {
    id: 1,
    name: 'Alpha Team',
    lead: 'John',
    members: 6,
    activeProjects: 3,
    department: 'Engineering',
    status: 'Active',
    description: 'Core dev team for Alpha CRM',
    membersList: [
      { name: 'John Smith', role: 'Team Lead', email: 'john@corp.com', tasks: 5, status: 'Active', avatar: '', skills: ['React', 'Node'], availability: 'Available' },
      { name: 'Sarah Doe', role: 'Developer', email: 'sarah@corp.com', tasks: 3, status: 'Active', avatar: '', skills: ['Python', 'Django'], availability: 'Available' },
      { name: 'Mike Brown', role: 'QA', email: 'mike@corp.com', tasks: 4, status: 'Active', avatar: '', skills: ['Testing'], availability: 'Available' },
    ],
    projects: [
      { name: 'Alpha CRM', progress: 80 },
      { name: 'Mobile App', progress: 60 },
      { name: 'API Gateway', progress: 40 },
    ],
    announcements: [
      { id: 1, text: 'Sprint planning meeting at 10am.' },
      { id: 2, text: 'Release scheduled for Friday.' },
    ],
  },
  {
    id: 2,
    name: 'Beta Squad',
    lead: 'Sarah',
    members: 5,
    activeProjects: 2,
    department: 'Product',
    status: 'Active',
    description: 'Product team for Beta App',
    membersList: [
      { name: 'Sarah Doe', role: 'Team Lead', email: 'sarah@corp.com', tasks: 4, status: 'Active', avatar: '', skills: ['Product', 'Design'], availability: 'Available' },
      { name: 'Mike Brown', role: 'Developer', email: 'mike@corp.com', tasks: 2, status: 'Active', avatar: '', skills: ['React'], availability: 'Available' },
    ],
    projects: [
      { name: 'Beta App', progress: 70 },
      { name: 'Web Portal', progress: 50 },
    ],
    announcements: [
      { id: 1, text: 'Design review tomorrow.' },
    ],
  },
  {
    id: 3,
    name: 'Gamma Crew',
    lead: 'Mike',
    members: 8,
    activeProjects: 4,
    department: 'QA',
    status: 'Active',
    description: 'QA and testing team for Gamma',
    membersList: [
      { name: 'Mike Brown', role: 'Team Lead', email: 'mike@corp.com', tasks: 6, status: 'Active', avatar: '', skills: ['Testing', 'Automation'], availability: 'Available' },
    ],
    projects: [
      { name: 'Gamma Platform', progress: 90 },
      { name: 'Test Suite', progress: 60 },
      { name: 'Performance Lab', progress: 50 },
      { name: 'Security Audit', progress: 30 },
    ],
    announcements: [
      { id: 1, text: 'QA sprint retrospective at 2pm.' },
    ],
  },
];

const Teams = () => {
  const [teams, setTeams] = useState(demoTeams);
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterLead, setFilterLead] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const [selectedTeam, setSelectedTeam] = useState(teams[0]);

  // Filtered teams
  const filteredTeams = teams.filter(t => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = t.name?.toLowerCase().includes(s) || t.lead?.toLowerCase().includes(s) || t.department?.toLowerCase().includes(s);
    }
    if (filterProject) match = match && t.projects.some(p => p.name === filterProject);
    if (filterLead) match = match && t.lead === filterLead;
    if (filterStatus) match = match && t.status === filterStatus;
    if (filterDepartment) match = match && t.department === filterDepartment;
    return match;
  });
  const totalTeams = teams.length;
  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-users-cog" style={{ marginRight: 10 }}></i> Teams</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Project</option>
            {teams.flatMap(t => t.projects).map((p, i) => <option key={i} value={p.name}>{p.name}</option>)}
          </select>
          <select value={filterLead} onChange={e => setFilterLead(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Team Lead</option>
            {teams.map(t => <option key={t.id} value={t.lead}>{t.lead}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Status</option>
            <option value="Active">Active</option>
          </select>
          <select value={filterDepartment} onChange={e => setFilterDepartment(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Department</option>
            {teams.map(t => <option key={t.id} value={t.department}>{t.department}</option>)}
          </select>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }}
            aria-label="Search teams"
          />
        </div>
      </div>
      {/* Dashboard Summary & Actions */}
      <div className="card-body" style={{ padding: 24 }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total Teams: {totalTeams}</span>
        </div>
        <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
          <Button variant="contained" color="primary" size="small"><i className="far fa-plus-square"></i> New Team</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-filter"></i> Filter</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export"></i> Export PDF</Button>
          <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel"></i> Export Excel</Button>
          <Button variant="outlined" color="info" size="small"><i className="fas fa-robot"></i> AI Insights</Button>
          <span style={{ fontStyle: 'italic', color: '#888', fontSize: 14 }}>
            "Team Alpha has 20% of members overbooked this sprint."
          </span>
        </div>
        {/* Teams Table */}
        <div style={{ marginBottom: 24 }}>
          <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
            <thead>
              <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                <td>Team Name</td>
                <td>Lead</td>
                <td>Members</td>
                <td>Active Projects</td>
              </tr>
            </thead>
            <tbody>
              {filteredTeams.map(t => (
                <tr key={t.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedTeam(t)}>
                  <td>{t.name}</td>
                  <td>{t.lead}</td>
                  <td>{t.members}</td>
                  <td>{t.activeProjects}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Team Details View */}
        {selectedTeam && (
          <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24 }}>
            <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selectedTeam.name} <Chip label={selectedTeam.status} color="success" size="small" /></h5>
            <div style={{ marginBottom: 8 }}><b>Lead:</b> {selectedTeam.lead} | <b>Department:</b> {selectedTeam.department} | <b>Total Members:</b> {selectedTeam.members}</div>
            <div style={{ marginBottom: 8 }}><b>Description:</b> {selectedTeam.description}</div>
            {/* Members Table */}
            <h6 style={{ fontWeight: 600, marginTop: 18 }}>Members</h6>
            <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
              <thead>
                <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                  <td>Member Name</td>
                  <td>Role</td>
                  <td>Email</td>
                  <td>Current Tasks</td>
                  <td>Status</td>
                </tr>
              </thead>
              <tbody>
                {selectedTeam.membersList.map((m, i) => (
                  <tr key={i}>
                    <td>{m.name}</td>
                    <td>{m.role}</td>
                    <td>{m.email}</td>
                    <td>{m.tasks}</td>
                    <td><Chip label={m.status} color="success" size="small" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Team Projects Panel */}
            <h6 style={{ fontWeight: 600, marginTop: 18 }}>Active Projects</h6>
            <div style={{ display: 'flex', gap: 18, marginBottom: 12 }}>
              {selectedTeam.projects.map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ marginTop: 8 }}>
                    <LinearProgress variant="determinate" value={p.progress} style={{ height: 8, borderRadius: 4, background: '#eee' }} />
                    <span style={{ marginLeft: 8, fontWeight: 600 }}>{p.progress}%</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Announcements / Notes Panel */}
            <h6 style={{ fontWeight: 600, marginTop: 18 }}>Announcements / Notes</h6>
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minHeight: 60 }}>
              {selectedTeam.announcements.map(a => (
                <div key={a.id} style={{ marginBottom: 6, color: '#1976d2' }}><i className="fas fa-bullhorn" style={{ marginRight: 6 }}></i> {a.text}</div>
              ))}
            </div>
            {/* Actions */}
            <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
              <Button variant="outlined" color="info" size="small">Add Member</Button>
              <Button variant="outlined" color="primary" size="small">Assign Roles</Button>
              <Button variant="outlined" color="success" size="small">Export Team</Button>
              <Button variant="outlined" color="warning" size="small">Edit Team</Button>
              <Button variant="outlined" color="error" size="small">Remove Team</Button>
            </div>
          </div>
        )}
        {/* Analytics & Reporting */}
        <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24 }}>
          <h5 style={{ fontWeight: 700, marginBottom: 8 }}>Team Analytics & Reporting</h5>
          <div style={{ display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Utilization & Workload</div>
              <div style={{ height: 80, background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: 8, marginBottom: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 18 }}>
                [Demo] Team utilization, workload balance, completion rates
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Export team member lists and activity reports.</div>
            </div>
            <div style={{ flex: 2 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>AI Insights</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] "Team Alpha has 20% of members overbooked this sprint."</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Auto-suggest team allocation based on skills, availability, and workload.</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Multi-project team view for portfolio-level management.</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Historical performance tracking and benchmarking.</div>
              <div style={{ fontSize: 13, color: '#888' }}>[Demo] Integration with resource assignment, workload, and sprints modules.</div>
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export"></i> Export PDF</Button>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel"></i> Export Excel</Button>
          </div>
        </div>
        {/* Floating New Team Button */}
        <Tooltip title="New Team" arrow>
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
            aria-label="New Team"
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};



export default Teams;
