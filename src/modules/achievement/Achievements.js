
import React, { useState } from 'react';

const demoAchievements = [
  {
    id: 1,
    title: '100 Tasks Completed',
    type: 'Personal',
    awardedTo: 'John Smith',
    date: '2025-09-20',
    badge: '🥇',
    color: '#ffd700',
    description: 'Recognized for completing 100 tasks.',
    recipients: ['John Smith'],
    category: 'Productivity',
    points: 1200,
    kudos: ['👏 Awesome work @John on task completion!'],
  },
  {
    id: 2,
    title: 'Sprint 21 Delivered',
    type: 'Team',
    awardedTo: 'Alpha Team',
    date: '2025-09-22',
    badge: '🚀',
    color: '#c0c0c0',
    description: 'Team delivered Sprint 21 on time.',
    recipients: ['Sarah Doe', 'Mike Brown', 'John Smith'],
    category: 'Collaboration',
    points: 1100,
    kudos: ['Thanks team for staying on schedule!'],
  },
  {
    id: 3,
    title: 'Project Alpha Launched',
    type: 'Project',
    awardedTo: 'Project A',
    date: '2025-09-25',
    badge: '🎉',
    color: '#cd7f32',
    description: 'Alpha CRM v1.0 successfully launched.',
    recipients: ['Alpha Team'],
    category: 'Innovation',
    points: 1050,
    kudos: ['👏 Great job on the API migration!'],
  },
];

const demoLeaderboard = [
  { name: 'John Smith', icon: '🏆', points: 1200 },
  { name: 'Sarah Doe', icon: '⭐', points: 1100 },
  { name: 'Mike Brown', icon: '🔥', points: 1050 },
];

const Achievements = () => {
  const [achievements] = useState(demoAchievements);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterDate, setFilterDate] = useState("");
  const [selected, setSelected] = useState(demoAchievements[0]);

  // Filtered achievements
  const filtered = achievements.filter(a => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = a.title.toLowerCase().includes(s) || a.awardedTo.toLowerCase().includes(s) || a.type.toLowerCase().includes(s);
    }
    if (filterType) match = match && a.type === filterType;
    if (filterDate) match = match && a.date === filterDate;
    return match;
  });

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1100, margin: '40px auto' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-award" style={{ marginRight: 10 }}></i> Achievements</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterType} onChange={e => setFilterType(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Type</option>
            <option value="Personal">Individual</option>
            <option value="Team">Team</option>
            <option value="Project">Project</option>
          </select>
          <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }} />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search achievements" />
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Suggest</button>
        </div>
      </div>
      {/* Dashboard Table */}
      <div className="card-body" style={{ padding: 32 }}>
        <div style={{ marginBottom: 18, fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total Achievements: {filtered.length}</span>
        </div>
        <table className="table" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
              <th>Badge</th>
              <th>Title</th>
              <th>Awarded To</th>
              <th>Type</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} style={{ cursor: 'pointer', borderLeft: `6px solid ${a.color}` }} onClick={() => setSelected(a)}>
                <td style={{ fontSize: 28 }}>{a.badge}</td>
                <td>{a.title}</td>
                <td>{a.awardedTo}</td>
                <td>{a.type}</td>
                <td>{a.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Achievement Detail View */}
        {selected && (
          <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24, display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selected.title}</h5>
              <div style={{ marginBottom: 8 }}><b>Type:</b> {selected.type} | <b>Date:</b> {selected.date}</div>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{selected.badge}</div>
              <div style={{ marginBottom: 8 }}><b>Description:</b> {selected.description}</div>
              <div style={{ marginBottom: 8 }}><b>Recipients:</b> {selected.recipients.map((r, i) => (
                <span key={i} style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 6, padding: '2px 8px', marginRight: 6, fontSize: 13 }}>{r}</span>
              ))}</div>
              <div style={{ marginBottom: 8 }}><b>Category:</b> {selected.category} | <b>Points:</b> {selected.points}</div>
              <h6 style={{ fontWeight: 600, marginTop: 18 }}>Kudos Feed</h6>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minHeight: 60 }}>
                {selected.kudos.map((k, i) => (
                  <div key={i} style={{ marginBottom: 6, color: '#1976d2' }}><i className="fas fa-comment" style={{ marginRight: 6 }}></i> {k}</div>
                ))}
              </div>
            </div>
            {/* Leaderboard View (Gamification) */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Leaderboard</h6>
              <ol style={{ paddingLeft: 18, marginBottom: 8 }}>
                {demoLeaderboard.map((l, i) => (
                  <li key={i} style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                    {l.name} <span style={{ fontSize: 18 }}>{l.icon}</span> <span style={{ color: '#1976d2', fontWeight: 700 }}>{l.points} pts</span>
                  </li>
                ))}
              </ol>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI suggestions for recognition, custom branded badges, HR integration, portfolio tracking.</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] Export/share achievements in PDF reports.</div>
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
          background: 'linear-gradient(90deg, #ffd700 0%, #c0c0c0 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: 56,
          height: 56,
          boxShadow: '0 4px 16px #ffd70099',
          fontSize: 28,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000
        }}
        aria-label="Add Achievement"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Achievements;
