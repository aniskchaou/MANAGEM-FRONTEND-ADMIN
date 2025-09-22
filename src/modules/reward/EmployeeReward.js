import React, { useState } from 'react';

const myPoints = 1250;
const demoRewards = [
  { id: 1, title: 'Wireless Headphones', icon: '🎧', points: 1200, category: 'Lifestyle', available: true, description: 'High-quality wireless headphones for music and calls.' },
  { id: 2, title: 'Coffee Gift Card', icon: '☕', points: 300, category: 'Perks', available: true, description: 'Enjoy a $25 Starbucks Gift Card.' },
  { id: 3, title: 'Online Course Access', icon: '🎓', points: 800, category: 'Professional Development', available: true, description: 'Access to a top-rated online course.' },
  { id: 4, title: 'Extra Vacation Day', icon: '🏖️', points: 1500, category: 'Lifestyle', available: false, description: 'Request an extra paid vacation day.' },
];

const demoLeaderboard = [
  { name: 'John Smith', icon: '🏆', points: 2800 },
  { name: 'Sarah Doe', icon: '⭐', points: 2600 },
  { name: 'Mike Brown', icon: '🔥', points: 2300 },
];

const demoHistory = [
  { title: 'Coffee Gift Card', date: '2025-09-10', status: 'Approved' },
  { title: 'Wireless Headphones', date: '2025-09-15', status: 'Redeemed' },
];

const EmployeeReward = () => {
  const [selected, setSelected] = useState(demoRewards[0]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showRecognition, setShowRecognition] = useState(false);
  const [recipient, setRecipient] = useState('Sarah Doe');
  const [rewardMsg, setRewardMsg] = useState('Thanks for leading the testing effort!');

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1100, margin: '40px auto' }}>
      {/* Sticky Points Header & Actions */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span style={{ fontWeight: 700, fontSize: 20 }}><i className="fas fa-coins" style={{ marginRight: 8 }}></i> My Points: {myPoints}</span>
          <button className="btn btn-success btn-sm" style={{ minWidth: 120, fontWeight: 600, borderRadius: 8 }}><i className="fas fa-gift"></i> Redeem Reward</button>
          <button className="btn btn-outline-primary btn-sm" style={{ minWidth: 120, fontWeight: 600, borderRadius: 8 }} onClick={() => setShowLeaderboard(!showLeaderboard)}><i className="fas fa-trophy"></i> Leaderboard</button>
        </div>
        <div style={{ minWidth: 320, display: 'flex', alignItems: 'center', gap: 8 }}>
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Suggest</button>
        </div>
      </div>
      {/* Leaderboard View */}
      {showLeaderboard && (
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 18, margin: '24px 0' }}>
          <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Leaderboard</h6>
          <ol style={{ paddingLeft: 18, marginBottom: 8 }}>
            {demoLeaderboard.map((l, i) => (
              <li key={i} style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>
                {l.name} <span style={{ fontSize: 18 }}>{l.icon}</span> <span style={{ color: '#1976d2', fontWeight: 700 }}>{l.points} pts</span>
              </li>
            ))}
          </ol>
        </div>
      )}
      {/* Reward Catalog */}
      <div className="card-body" style={{ padding: 32 }}>
        <h5 style={{ fontWeight: 700, marginBottom: 18 }}>Reward Catalog</h5>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18, marginBottom: 24 }}>
          {demoRewards.map(r => (
            <div key={r.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #ddd', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', cursor: 'pointer', borderLeft: `6px solid #43a047` }} onClick={() => setSelected(r)}>
              <div style={{ fontSize: 38, marginBottom: 8 }}>{r.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>{r.title}</div>
              <div style={{ color: '#888', fontSize: 14, marginBottom: 8 }}>{r.category}</div>
              <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 15, marginBottom: 8 }}>{r.points} pts</div>
              <button className="btn btn-success btn-sm" style={{ minWidth: 90, borderRadius: 8 }} disabled={!r.available}>{r.available ? 'Redeem' : 'Request'}</button>
            </div>
          ))}
        </div>
        {/* Reward Detail View */}
        {selected && (
          <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24, display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selected.title}</h5>
              <div style={{ fontSize: 48, marginBottom: 8 }}>{selected.icon}</div>
              <div style={{ marginBottom: 8 }}><b>Points:</b> {selected.points} | <b>Category:</b> {selected.category}</div>
              <div style={{ marginBottom: 8 }}><b>Description:</b> {selected.description}</div>
              <button className="btn btn-success btn-sm" style={{ minWidth: 120, borderRadius: 8, marginTop: 8 }}>{selected.available ? 'Redeem Now' : 'Request'}</button>
            </div>
            {/* History Sidebar */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Redemption History</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>{demoHistory.map((h, i) => (
                <div key={i}>{h.date}: {h.title} ({h.status})</div>
              ))}</div>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI reward suggestions, branded rewards, global catalog, tax compliance.</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] Exportable reports for HR/management.</div>
            </div>
          </div>
        )}
        {/* Recognition Flow (Peer/Manager) */}
        {showRecognition && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 18, marginBottom: 24 }}>
            <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Give Reward</h6>
            <div style={{ marginBottom: 8 }}>
              <b>Recipient:</b> <input type="text" value={recipient} onChange={e => setRecipient(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }} />
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Reward:</b> <select style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
                {demoRewards.map(r => <option key={r.id} value={r.title}>{r.icon} {r.title} ({r.points} pts)</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 8 }}>
              <b>Message:</b> <input type="text" value={rewardMsg} onChange={e => setRewardMsg(e.target.value)} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 220 }} />
            </div>
            <button className="btn btn-info btn-sm" style={{ minWidth: 120, borderRadius: 8 }}>Send Recognition</button>
          </div>
        )}
      </div>
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
        aria-label="Give Reward"
        onClick={() => setShowRecognition(!showRecognition)}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default EmployeeReward;
