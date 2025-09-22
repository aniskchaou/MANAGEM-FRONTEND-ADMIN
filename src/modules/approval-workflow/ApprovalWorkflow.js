import React from 'react';

const ApprovalWorkflow = () => (
  <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 900, margin: '40px auto' }}>
    <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-project-diagram" style={{ marginRight: 10 }}></i> Approval Workflows</h4>
      </div>
      <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Optionally add search/filter here */}
      </div>
    </div>
    <div className="card-body" style={{ padding: 32 }}>
      <div style={{ marginBottom: 24 }}>
        <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90, marginRight: 10 }}><i className="far fa-plus-square"></i> Create</button>
        <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90, marginRight: 10 }}><i className="fas fa-edit"></i> Edit</button>
        <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90, marginRight: 10 }}><i className="fas fa-trash-alt"></i> Remove</button>
        <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-repeat"></i> Reload</button>
      </div>
      <div style={{ padding: 32, textAlign: 'center', color: '#888' }}>
        <i className="fas fa-project-diagram" style={{ fontSize: 48, color: '#1976d2', marginBottom: 16 }}></i>
        <h5 style={{ fontWeight: 600, marginBottom: 12 }}>No Approval Workflows yet</h5>
        <p style={{ fontSize: 16 }}>Start by creating a new approval workflow to streamline your project processes.</p>
      </div>
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
      aria-label="Add Approval Workflow"
    >
      <i className="fas fa-plus"></i>
    </button>
  </div>
);

export default ApprovalWorkflow;
