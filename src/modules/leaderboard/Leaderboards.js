
import React, { useState } from 'react';

const demoIndividual = [
  { rank: 1, name: 'John Smith', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', points: 2800, achievements: 15, tasks: 42, badge: '🥇', kudos: ['👏 Thanks John for leading the Alpha CRM launch!'] },
  { rank: 2, name: 'Sarah Doe', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', points: 2600, achievements: 12, tasks: 38, badge: '🥈', kudos: ['👏 Great job on QA testing!'] },
  { rank: 3, name: 'Mike Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', points: 2300, achievements: 10, tasks: 35, badge: '🥉', kudos: [] },
  { rank: 4, name: 'Lisa Wong', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', points: 2000, achievements: 9, tasks: 30, badge: '', kudos: [] },
];

const demoTeam = [
  { rank: 1, name: 'Alpha Team', points: 8500, projects: 3, velocity: 45, badge: '🥇' },
  { rank: 2, name: 'Beta Squad', points: 7600, projects: 2, velocity: 40, badge: '🥈' },
  { rank: 3, name: 'Gamma Crew', points: 6900, projects: 2, velocity: 38, badge: '🥉' },
];

const Leaderboards = () => {
  const [view, setView] = useState('individual');
  const [search, setSearch] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [filterTeam, setFilterTeam] = useState("");
  const [filterTimeframe, setFilterTimeframe] = useState("");
  const [selected, setSelected] = useState(demoIndividual[0]);
  const [showProfile, setShowProfile] = useState(false);

  // Filtered data
  const filteredIndividual = demoIndividual.filter(i => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = i.name.toLowerCase().includes(s);
    }
    return match;
  });
  const filteredTeam = demoTeam.filter(t => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = t.name.toLowerCase().includes(s);
    }
    return match;
  });

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1100, margin: '40px auto' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-trophy" style={{ marginRight: 10 }}></i> Leaderboards</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Project</option>
            <option value="Alpha CRM">Alpha CRM</option>
            <option value="Beta App">Beta App</option>
          </select>
          <select value={filterTeam} onChange={e => setFilterTeam(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Team</option>
            <option value="Alpha Team">Alpha Team</option>
            <option value="Beta Squad">Beta Squad</option>
            <option value="Gamma Crew">Gamma Crew</option>
          </select>
          <select value={filterTimeframe} onChange={e => setFilterTimeframe(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Timeframe</option>
            <option value="Week">Week</option>
            <option value="Month">Month</option>
            <option value="Quarter">Quarter</option>
          </select>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search leaderboard" />
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Insights</button>
          <button type="button" className="btn btn-outline-secondary btn-sm" style={{ minWidth: 90 }} onClick={() => setView(view === 'individual' ? 'team' : 'individual')}>
            <i className="fas fa-users"></i> Toggle: {view === 'individual' ? 'Team' : 'Individual'} View
          </button>
        </div>
      </div>
      {/* Individual Leaderboard */}
      {view === 'individual' && (
        <div className="card-body" style={{ padding: 32 }}>
          <table className="table" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                <th>Rank</th>
                <th>Avatar</th>
                <th>Employee</th>
                <th>Points</th>
                <th>Achievements</th>
                <th>Tasks Done</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndividual.map(i => (
                <tr key={i.rank} style={{ cursor: 'pointer', borderLeft: `6px solid #1976d2` }} onClick={() => { setSelected(i); setShowProfile(true); }}>
                  <td style={{ fontSize: 22 }}>{i.badge} {i.rank}.</td>
                  <td><img src={i.avatar} alt={i.name} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover', border: '2px solid #43a047' }} /></td>
                  <td>{i.name}</td>
                  <td style={{ fontWeight: 600, color: '#1976d2' }}>{i.points}</td>
                  <td>{i.achievements}</td>
                  <td>{i.tasks}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Team Leaderboard */}
      {view === 'team' && (
        <div className="card-body" style={{ padding: 32 }}>
          <table className="table" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 24 }}>
            <thead>
              <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                <th>Rank</th>
                <th>Team Name</th>
                <th>Points</th>
                <th>Projects Delivered</th>
                <th>Sprint Velocity</th>
              </tr>
            </thead>
            <tbody>
              {filteredTeam.map(t => (
                <tr key={t.rank} style={{ cursor: 'pointer', borderLeft: `6px solid #43a047` }}>
                  <td style={{ fontSize: 22 }}>{t.badge} {t.rank}.</td>
                  <td>{t.name}</td>
                  <td style={{ fontWeight: 600, color: '#1976d2' }}>{t.points}</td>
                  <td>{t.projects}</td>
                  <td>{t.velocity} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {/* Profile Drill-Down */}
      {showProfile && selected && (
        <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', margin: '24px', display: 'flex', gap: 32 }}>
          <div style={{ flex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 8 }}>
              <img src={selected.avatar} alt={selected.name} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', border: '3px solid #43a047' }} />
              <div>
                <h5 style={{ fontWeight: 700, marginBottom: 4 }}>{selected.name}</h5>
                <div style={{ color: '#888', fontSize: 15 }}>Role: Developer</div>
                <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 16 }}>Points: {selected.points}</div>
              </div>
            </div>
            <div style={{ marginTop: 18, marginBottom: 8, fontWeight: 600 }}>Breakdown:</div>
            <div style={{ display: 'flex', gap: 18 }}>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                <b>Tasks Completed</b><br />{selected.tasks}
              </div>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                <b>Achievements Earned</b><br />{selected.achievements}
              </div>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                <b>Rewards Redeemed</b><br />{Math.floor(selected.points/100)}
              </div>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minWidth: 160 }}>
                <b>Kudos Received</b><br />{selected.kudos.length}
              </div>
            </div>
            <h6 style={{ fontWeight: 600, marginTop: 18 }}>Kudos Wall</h6>
            <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minHeight: 60 }}>
              {selected.kudos.map((k, i) => (
                <div key={i} style={{ marginBottom: 6, color: '#1976d2' }}><i className="fas fa-comment" style={{ marginRight: 6 }}></i> {k}</div>
              ))}
            </div>
          </div>
          {/* Sidebar (Premium Features) */}
          <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
            <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</h6>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI insights, predictive scoring, gamified challenges, export reports.</div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] HR integration for performance review.</div>
          </div>
        </div>
      )}
      {/* Floating Add Button */}
      <button
        style={{
          position: 'fixed',
          bottom: 38,
          right: 38,
          background: 'linear-gradient(90deg, #ffd700 0%, #43a047 100%)',
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
        aria-label="Give Kudos"
        onClick={() => setShowProfile(false)}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default Leaderboards;
