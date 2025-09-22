import React, { useState } from 'react';

const demoTodos = [
  {
    id: 1,
    title: 'Fix login page bug',
    due: '2025-09-22',
    assignee: 'John',
    status: 'To Do',
    priority: 'High',
    tags: ['urgent'],
    checklist: [
      { text: 'Check error logs', done: false },
      { text: 'Test on staging', done: false },
    ],
    comments: [
      { author: 'Sarah', text: 'Is this related to the last release?' }
    ],
    overdue: false,
  },
  {
    id: 2,
    title: 'Review design mockups',
    due: '',
    assignee: 'Sarah',
    status: 'Done',
    priority: 'Medium',
    tags: ['review'],
    checklist: [
      { text: 'Review homepage', done: true },
      { text: 'Review dashboard', done: true },
    ],
    comments: [],
    overdue: false,
  },
  {
    id: 3,
    title: 'Prepare sprint retrospective',
    due: '2025-09-25',
    assignee: 'Mike',
    status: 'In Progress',
    priority: 'Low',
    tags: ['idea'],
    checklist: [
      { text: 'Draft agenda', done: false },
      { text: 'Collect feedback', done: false },
    ],
    comments: [],
    overdue: false,
  },
  {
    id: 4,
    title: 'Update project budget draft',
    due: '2025-09-20',
    assignee: 'John',
    status: 'To Do',
    priority: 'High',
    tags: ['urgent'],
    checklist: [
      { text: 'Review expenses', done: false },
      { text: 'Update spreadsheet', done: false },
    ],
    comments: [
      { author: 'Mike', text: 'Budget draft is overdue!' }
    ],
    overdue: true,
  },
];

const ToDo = () => {
  const [todos] = useState(demoTodos);
  const [search, setSearch] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterProject, setFilterProject] = useState("");
  const [selectedTodo, setSelectedTodo] = useState(demoTodos[0]);
  const [view, setView] = useState('list');

  // Filtered todos
  const filteredTodos = todos.filter(t => {
    let match = true;
    if (search.trim()) {
      const s = search.toLowerCase();
      match = t.title.toLowerCase().includes(s) || t.assignee.toLowerCase().includes(s) || t.tags.join(' ').toLowerCase().includes(s);
    }
    if (filterAssignee) match = match && t.assignee === filterAssignee;
    if (filterStatus) match = match && t.status === filterStatus;
    if (filterProject) match = match && t.tags.includes(filterProject);
    return match;
  });

  // Priority color
  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#e53935';
    if (priority === 'Medium') return '#ffb300';
    return '#43a047';
  };

  // Completion percentage
  const completionPercent = Math.round((todos.filter(t => t.status === 'Done').length / todos.length) * 100);

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative', maxWidth: 1100, margin: '40px auto' }}>
      {/* Dashboard Header & Filters */}
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-tasks" style={{ marginRight: 10 }}></i> To-Do</h4>
        </div>
        <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
          <select value={filterAssignee} onChange={e => setFilterAssignee(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Assignee</option>
            {todos.map(t => <option key={t.id} value={t.assignee}>{t.assignee}</option>)}
          </select>
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Status</option>
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
            <option value="">Tag</option>
            {todos.flatMap(t => t.tags).map((tag, i) => <option key={i} value={tag}>{tag}</option>)}
          </select>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search todos" />
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-export"></i> Export PDF</button>
          <button type="button" className="btn btn-outline-primary btn-sm" style={{ minWidth: 90 }}><i className="fas fa-file-excel"></i> Export Excel</button>
          <button type="button" className="btn btn-outline-info btn-sm" style={{ minWidth: 90 }}><i className="fas fa-robot"></i> AI Sort</button>
        </div>
      </div>
      {/* Progress & Actions */}
      <div className="card-body" style={{ padding: 32 }}>
        <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
          <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Completion: {completionPercent}%</span>
          <span><i className="fas fa-calendar-day" style={{ marginRight: 6 }}></i> Daily Summary: {todos.filter(t => t.status === 'Done').length} done, {todos.filter(t => t.status !== 'Done').length} pending</span>
        </div>
        {/* View Switcher */}
        <div className="btn-group ml-2 mb-2" role="group" aria-label="View Switcher" style={{ marginBottom: 10 }}>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'list' ? ' active' : ''}`} onClick={() => setView('list')}><i className="fas fa-list"></i> List</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'kanban' ? ' active' : ''}`} onClick={() => setView('kanban')}><i className="fas fa-columns"></i> Kanban</button>
          <button type="button" className={`btn btn-outline-primary btn-sm${view === 'calendar' ? ' active' : ''}`} onClick={() => setView('calendar')}><i className="fas fa-calendar-alt"></i> Calendar</button>
        </div>
        {/* List View */}
        {view === 'list' && (
          <div style={{ marginBottom: 24 }}>
            {filteredTodos.map(todo => (
              <div key={todo.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 16, marginBottom: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderLeft: `6px solid ${getPriorityColor(todo.priority)}` }} onClick={() => setSelectedTodo(todo)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <input type="checkbox" checked={todo.status === 'Done'} readOnly style={{ accentColor: getPriorityColor(todo.priority), width: 22, height: 22 }} />
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{todo.title}</span>
                  {todo.tags.map((tag, i) => <span key={i} style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 6, padding: '2px 8px', marginLeft: 8, fontSize: 13 }}>#{tag}</span>)}
                  {todo.overdue && <span style={{ color: '#e53935', fontWeight: 600, marginLeft: 8 }}>Overdue!</span>}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: '#888', fontSize: 14 }}>Due: {todo.due || '—'}</span>
                  <span style={{ color: '#888', fontSize: 14 }}>[{todo.assignee}]</span>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Kanban View */}
        {view === 'kanban' && (
          <div style={{ display: 'flex', gap: 18, marginBottom: 24 }}>
            {['To Do', 'In Progress', 'Done'].map(col => (
              <div key={col} style={{ flex: 1, background: '#f5f7fa', borderRadius: 8, padding: 12, minHeight: 220 }}>
                <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{col}</div>
                {filteredTodos.filter(t => t.status === col).map(todo => (
                  <div key={todo.id} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, marginBottom: 8, cursor: 'pointer', borderLeft: `6px solid ${getPriorityColor(todo.priority)}` }} onClick={() => setSelectedTodo(todo)}>
                    <span style={{ fontWeight: 600 }}>{todo.title}</span>
                    <span style={{ color: '#888', fontSize: 13, marginLeft: 8 }}>[{todo.assignee}]</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {/* Calendar View (static demo) */}
        {view === 'calendar' && (
          <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 18, minHeight: 220, marginBottom: 24 }}>
            <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Calendar View (Demo)</h6>
            <div style={{ color: '#888', fontSize: 15 }}>[Demo] To-dos with deadlines plotted here.</div>
          </div>
        )}
        {/* To-Do Detail Panel */}
        {selectedTodo && (
          <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24, display: 'flex', gap: 32 }}>
            <div style={{ flex: 2 }}>
              <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selectedTodo.title}</h5>
              <div style={{ marginBottom: 8 }}><b>Assignee:</b> {selectedTodo.assignee} | <b>Due:</b> {selectedTodo.due || '—'} | <b>Priority:</b> <span style={{ color: getPriorityColor(selectedTodo.priority), fontWeight: 600 }}>{selectedTodo.priority}</span></div>
              {/* Checklist */}
              <h6 style={{ fontWeight: 600, marginTop: 18 }}>Checklist</h6>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {selectedTodo.checklist.map((item, i) => (
                  <li key={i} style={{ marginBottom: 6 }}>
                    <input type="checkbox" checked={item.done} readOnly style={{ accentColor: getPriorityColor(selectedTodo.priority), marginRight: 8 }} />
                    <span style={{ textDecoration: item.done ? 'line-through' : 'none', color: item.done ? '#888' : '#222' }}>{item.text}</span>
                  </li>
                ))}
              </ul>
              {/* Comments & Attachments */}
              <h6 style={{ fontWeight: 600, marginTop: 18 }}>Comments</h6>
              <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12, minHeight: 60 }}>
                {selectedTodo.comments.map((c, i) => (
                  <div key={i} style={{ marginBottom: 6, color: '#1976d2' }}><i className="fas fa-comment" style={{ marginRight: 6 }}></i> {c.text}</div>
                ))}
              </div>
              {/* Actions */}
              <div style={{ marginTop: 18, display: 'flex', gap: 12 }}>
                <button className="btn btn-outline-info btn-sm">Convert to Task</button>
                <button className="btn btn-outline-success btn-sm">Mark Done</button>
                <button className="btn btn-outline-danger btn-sm">Delete</button>
              </div>
            </div>
            {/* Sidebar (Filters, Premium) */}
            <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Tags</h6>
              <div style={{ marginBottom: 8 }}>{selectedTodo.tags.map((tag, i) => (
                <span key={i} style={{ background: '#e3f2fd', color: '#1976d2', borderRadius: 6, padding: '2px 8px', marginRight: 6, fontSize: 13 }}>#{tag}</span>
              ))}</div>
              <h6 style={{ fontWeight: 600, marginBottom: 8 }}>Premium Features</h6>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] AI-powered smart sorting, recurring to-dos, auto-convert meeting notes.</div>
              <div style={{ fontSize: 13, color: '#888', marginBottom: 8 }}>[Demo] Integration with tasks/sprints for upgrading a to-do.</div>
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
        aria-label="Add To-Do"
      >
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );
};

export default ToDo;
