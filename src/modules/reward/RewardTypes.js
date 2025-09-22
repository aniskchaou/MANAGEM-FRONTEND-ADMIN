import React, { useState } from 'react';

const demoRewardTypes = [
  { id: 1, title: 'Wireless Headphones', icon: '🎧', category: 'Monetary', cost: 1200, status: 'Active', description: 'Premium over-ear headphones with noise cancellation.', eligibility: 'All Employees', expiry: 'Never' },
  { id: 2, title: 'Coffee Gift Card', icon: '☕', category: 'Monetary', cost: 300, status: 'Active', description: 'Enjoy a $25 Starbucks Gift Card.', eligibility: 'All Employees', expiry: '2026-03-22' },
  { id: 3, title: 'Team Player Badge', icon: '🎉', category: 'Non-Monetary', cost: 200, status: 'Active', description: 'Awarded for outstanding teamwork.', eligibility: 'Managers Only', expiry: 'Never' },
  { id: 4, title: 'Extra Vacation Day', icon: '🏖️', category: 'Perk', cost: 1500, status: 'Pending', description: 'Request an extra paid vacation day.', eligibility: 'All Employees', expiry: 'Never' },
  { id: 5, title: 'Innovation Award', icon: '🏅', category: 'Non-Monetary', cost: 500, status: 'Active', description: 'Recognizes innovative solutions.', eligibility: 'Specific Teams', expiry: 'Never' },
  { id: 6, title: 'Training Course Access', icon: '🎓', category: 'Perk', cost: 800, status: 'Active', description: 'Access to a top-rated online course.', eligibility: 'All Employees', expiry: 'Never' },
  { id: 7, title: 'Company Hoodie', icon: '🧥', category: 'Custom', cost: 600, status: 'Active', description: 'Branded company hoodie.', eligibility: 'All Employees', expiry: 'Never' },
];

const categories = ['Monetary', 'Non-Monetary', 'Perk', 'Custom'];

const RewardTypes = () => {
  const [activeCat, setActiveCat] = useState('Monetary');
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'Monetary', description: '', cost: '', eligibility: '', expiry: '', status: 'Active' });

  // Filtered rewards
  const filtered = demoRewardTypes.filter(r => {
    let match = r.category === activeCat;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = match && (r.title.toLowerCase().includes(s) || r.description.toLowerCase().includes(s));
    }
    return match;
  });

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1100, margin: '40px auto' }}>
      {/* Dashboard Header & Category Tabs */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-medal" style={{ marginRight: 10 }}></i> Reward Types</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          {categories.map(cat => (
            <button key={cat} className={`btn btn-outline-primary btn-sm${activeCat === cat ? ' active' : ''}`} style={{ minWidth: 110, fontWeight: 600, borderRadius: 8 }} onClick={() => setActiveCat(cat)}>{cat}</button>
          ))}
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search rewards" />
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Suggest</button>
        </div>
      </div>
      {/* Reward Types Table (Admin View) */}
      <div className="card-body" style={{ padding: 32 }}>
        <table className="table" style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 24 }}>
          <thead>
            <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
              <th>Reward Type</th>
              <th>Category</th>
              <th>Cost/Points</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r => (
              <tr key={r.id} style={{ cursor: 'pointer', borderLeft: `6px solid #43a047` }}>
                <td style={{ fontSize: 22 }}>{r.icon} {r.title}</td>
                <td>{r.category}</td>
                <td style={{ fontWeight: 600, color: '#1976d2' }}>{r.cost} pts</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* Reward Type Creation Form (Admin) */}
        {showForm && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 18, marginBottom: 24 }}>
            <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Add Reward Type</h6>
            <form>
              <div style={{ marginBottom: 8 }}>
                <b>Title:</b> <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Category:</b> <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Description:</b> <input type="text" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 220 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Point Cost:</b> <input type="number" value={form.cost} onChange={e => setForm({ ...form, cost: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 80 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Eligibility:</b> <select value={form.eligibility} onChange={e => setForm({ ...form, eligibility: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
                  <option value="">Select</option>
                  <option value="All Employees">All Employees</option>
                  <option value="Managers Only">Managers Only</option>
                  <option value="Specific Teams">Specific Teams</option>
                </select>
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Expiry:</b> <input type="date" value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }} />
              </div>
              <div style={{ marginBottom: 8 }}>
                <b>Status:</b> <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} style={{ padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              <button className="btn btn-success btn-sm" style={{ minWidth: 120, borderRadius: 8, marginTop: 8 }}>Save</button>
            </form>
          </div>
        )}
        {/* Employee Catalog View (Grouped by Reward Type) */}
        <div style={{ marginTop: 18 }}>
          <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Employee Catalog</h6>
          {categories.map(cat => (
            <div key={cat} style={{ marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{cat}</div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {demoRewardTypes.filter(r => r.category === cat).map(r => (
                  <div key={r.id} style={{ background: '#fff', borderRadius: 12, boxShadow: '0 1px 4px #ddd', padding: 18, display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', cursor: 'pointer', borderLeft: `6px solid #43a047` }}>
                    <div style={{ fontSize: 32, marginBottom: 8 }}>{r.icon}</div>
                    <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{r.title}</div>
                    <div style={{ color: '#888', fontSize: 13, marginBottom: 8 }}>{r.description}</div>
                    <div style={{ fontWeight: 600, color: '#1976d2', fontSize: 14, marginBottom: 8 }}>{r.cost} pts</div>
                    <button className="btn btn-success btn-sm" style={{ minWidth: 90, borderRadius: 8 }}>{cat === 'Monetary' || cat === 'Perk' ? 'Redeem' : 'Claim'}</button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Premium Features */}
        <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, marginTop: 18 }}>
          <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</h6>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI reward suggestions, multi-currency, vendor API integration, analytics.</div>
          <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] Approval workflows, expiry rules, HR integration.</div>
        </div>
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
        aria-label="Add Reward Type"
        onClick={() => setShowForm(!showForm)}
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default RewardTypes;
