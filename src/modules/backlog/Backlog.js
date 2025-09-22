import React, { useEffect, useState } from 'react';
import { LinearProgress, Chip, IconButton, Tooltip, Button } from '@mui/material';
// Removed TreeView and TreeItem imports; using Bootstrap Accordion instead
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



// Fetch sprints, epics, and user stories, then build sprints structure
const fetchBacklogData = async () => {
  try {
    const [sprintsRes, epicsRes, userStoriesRes] = await Promise.all([
      fetch('/sprints.json'),
      fetch('http://localhost:5000/epics'),
      fetch('http://localhost:5000/userstories')
    ]);
    const sprints = await sprintsRes.json();
    const epics = await epicsRes.json();
    const userStories = await userStoriesRes.json();

    // Build sprints list only from sprint IDs referenced in epics
    const referencedSprintIds = new Set();
    epics.forEach(epic => {
      (epic.sprints || []).forEach(sprintId => referencedSprintIds.add(sprintId));
    });

    // Map only referenced sprints
    const sprintMap = {};
    sprints.forEach(sprint => {
      if (referencedSprintIds.has(sprint.id)) {
        sprintMap[sprint.id] = { ...sprint, epics: [] };
      }
    });

    // Assign epics to sprints
    epics.forEach(epic => {
      (epic.sprints || []).forEach(sprintId => {
        if (sprintMap[sprintId]) {
          // Attach user stories to epic
          const epicUserStories = userStories.filter(story => (story.linkedEpics || []).includes(epic.id));
          sprintMap[sprintId].epics.push({ ...epic, userStories: epicUserStories });
        }
      });
    });

    // Only return sprints that have at least one epic
    return Object.values(sprintMap).filter(sprint => sprint.epics.length > 0);
  } catch {
    return [];
  }
};

const KanbanView = ({ sprint }) => {
  if (!sprint || !sprint.epics) return (
    <div style={{ color: '#aaa', textAlign: 'center', height: 300, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <img src="/images/empty.png" alt="No data" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
      <div>No epics/user stories</div>
    </div>
  );

  // Gather all user stories from all epics in this sprint
  const allStories = sprint.epics.flatMap(epic =>
    (epic.userStories || []).map(story => ({ ...story, epicName: epic.name, epicColor: epic.color || '#1976d2' }))
  );

  // Group user stories by status
  const statusOrder = ['To Do', 'In Progress', 'Done'];
  const storiesByStatus = {};
  allStories.forEach(story => {
    const status = story.status || 'To Do';
    if (!storiesByStatus[status]) storiesByStatus[status] = [];
    storiesByStatus[status].push(story);
  });

  // Ensure all columns exist
  statusOrder.forEach(status => {
    if (!storiesByStatus[status]) storiesByStatus[status] = [];
  });

  // Calculate sprint progress
  const totalStories = allStories.length;
  const doneStories = allStories.filter(story => story.status === 'Done').length;
  const progress = totalStories ? Math.round((doneStories / totalStories) * 100) : 0;

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ margin: '0 0 12px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontWeight: 600, color: '#1976d2' }}>Sprint Progress:</span>
        <div style={{ flex: 1, background: '#e0e4ea', borderRadius: 8, height: 10, position: 'relative', overflow: 'hidden' }}>
          <div style={{ width: `${progress}%`, background: '#43a047', height: '100%', borderRadius: 8, transition: 'width 0.4s' }}></div>
        </div>
        <span style={{ fontWeight: 600, color: '#43a047', fontSize: 13 }}>{progress}%</span>
      </div>
      <div style={{ display: 'flex', gap: 18, height: 340, overflowX: 'auto', marginTop: 8 }}>
        {statusOrder.map(status => (
          <div key={status} style={{ flex: 1, minWidth: 260, background: '#f7f7f7', borderRadius: 10, padding: 10, boxShadow: '0 1px 6px #e0e4ea', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s' }}>
            <div style={{ textAlign: 'center', color: status === 'Done' ? '#43a047' : status === 'In Progress' ? '#fbc02d' : '#1976d2', fontWeight: 700, fontSize: 16, marginBottom: 8, letterSpacing: 1 }}>
              {status}
              <span style={{ background: '#1976d2', color: '#fff', borderRadius: 12, fontSize: 12, padding: '2px 10px', marginLeft: 8 }}>{storiesByStatus[status].length}</span>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', paddingRight: 2 }}>
              {storiesByStatus[status].length > 0 ? storiesByStatus[status].map(story => (
                <div key={story.id} style={{ background: '#fff', margin: '8px 0', borderRadius: 8, padding: 12, boxShadow: '0 1px 4px #eee', position: 'relative', borderLeft: `6px solid ${story.epicColor}`, transition: 'box-shadow 0.2s', cursor: 'pointer' }}
                  onMouseOver={e => e.currentTarget.style.boxShadow = '0 2px 8px #b3d1f7'}
                  onMouseOut={e => e.currentTarget.style.boxShadow = '0 1px 4px #eee'}
                >
                  <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                    <strong style={{ fontSize: 15, flex: 1 }}>{story.title}</strong>
                    <span style={{ marginLeft: 8 }}>
                      <Chip label={story.status || '—'} size="small" style={{ backgroundColor: status === 'Done' ? '#43a047' : status === 'In Progress' ? '#fbc02d' : '#bdbdbd', color: '#fff', fontWeight: 600, fontSize: 11, height: 22 }} />
                    </span>
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ width: 18, height: 18, borderRadius: '50%', background: story.epicColor, display: 'inline-block', marginRight: 4 }}></span>
                    Epic: {story.epicName}
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                    Assignee: {story.assigneeAvatar ? <img src={story.assigneeAvatar} alt={story.assignee} style={{ width: 18, height: 18, borderRadius: '50%', marginRight: 4 }} /> : <span style={{ background: '#1976d2', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, marginRight: 4 }}>{story.assignee ? story.assignee[0] : '—'}</span>}{story.assignee || '—'}
                  </div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Points: {story.points || '—'}</div>
                  <div style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Status: {story.status || '—'}</div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
                    <Tooltip title="View details" arrow><Button size="small" variant="outlined" color="info" onClick={() => alert('View details for: ' + story.title)} style={{ transition: 'box-shadow 0.2s' }}>
                      <i className="fas fa-eye"></i>
                    </Button></Tooltip>
                    <Tooltip title="Edit" arrow><Button size="small" variant="outlined" color="primary" onClick={() => alert('Edit: ' + story.title)} style={{ transition: 'box-shadow 0.2s' }}>
                      <i className="fas fa-edit"></i>
                    </Button></Tooltip>
                    <Tooltip title="Delete" arrow><Button size="small" variant="outlined" color="error" onClick={() => alert('Delete: ' + story.title)} style={{ transition: 'box-shadow 0.2s' }}>
                      <i className="fas fa-trash"></i>
                    </Button></Tooltip>
                  </div>
                </div>
              )) : <div style={{ color: '#aaa', textAlign: 'center', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/images/empty.png" alt="No stories" style={{ width: 60, opacity: 0.5, marginBottom: 8 }} />
                <div>No user stories</div>
              </div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Backlog = () => {
  const [backlog, setBacklog] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedSprint, setExpandedSprint] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchBacklogData().then(data => {
      setBacklog(data);
      console.log('Fetched backlog data:', data);
      setLoading(false);
    });
  }, []);

  const handleSprintClick = (sprintId) => {
    setExpandedSprint(expandedSprint === sprintId ? null : sprintId);
  };

  // Filter sprints by search
  const filteredBacklog = backlog.filter(sprint => {
    if (!search.trim()) return true;
    const sprintName = sprint.name?.toLowerCase() || "";
    const epicNames = sprint.epics?.map(e => e.name?.toLowerCase() || "").join(" ") || "";
    return sprintName.includes(search.toLowerCase()) || epicNames.includes(search.toLowerCase());
  });

  return (
    <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
      <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-tasks" style={{ marginRight: 10 }}></i> Backlog</h4>
          <Tooltip title="This page shows all sprints, epics, and user stories. Use the search bar to filter. Click the + button to add a new sprint." arrow>
            <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></IconButton>
          </Tooltip>
        </div>
        <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search sprints or epics..."
            style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
            aria-label="Search sprints or epics"
          />
        </div>
      </div>
      <div className="card-body" style={{ padding: 24 }}>
        {loading ? <LinearProgress /> : (
          <div className="accordion" id="backlogAccordion" style={{ width: '100%', background: '#f4f6fa', borderRadius: 12, padding: 12, border: '1px solid #e0e4ea', boxShadow: '0 2px 8px #e0e4ea55' }}>
            {filteredBacklog.length === 0 ? (
              <div style={{ color: '#aaa', textAlign: 'center', marginTop: 60, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img src="/images/empty.png" alt="No sprints" style={{ width: 80, opacity: 0.5, marginBottom: 12 }} />
                <div>No sprints available</div>
              </div>
            ) : filteredBacklog.map((sprint, idx) => {
              // Sprint summary
              const allStories = sprint.epics?.flatMap(epic => epic.userStories || []) || [];
              const done = allStories.filter(story => story.status === 'Done').length;
              const inProgress = allStories.filter(story => story.status === 'In Progress').length;
              const todo = allStories.filter(story => story.status === 'To Do').length;
              return (
                <div className="accordion-item" key={sprint.id} style={{ border: 'none', borderLeft: '4px solid #1976d2', marginBottom: 12, background: expandedSprint === sprint.id ? '#e3f0fc' : '#fff', borderRadius: 8, boxShadow: expandedSprint === sprint.id ? '0 2px 8px #b3d1f7' : '0 1px 3px #e0e4ea', transition: 'box-shadow 0.2s' }}>
                  <h2 className="accordion-header" id={`heading${sprint.id}`} style={{ border: 'none' }}>
                    <button
                      className={`accordion-button${expandedSprint === sprint.id ? '' : ' collapsed'}`}
                      type="button"
                      aria-expanded={expandedSprint === sprint.id}
                      aria-controls={`collapse${sprint.id}`}
                      onClick={() => handleSprintClick(sprint.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        justifyContent: 'space-between',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        boxShadow: 'none',
                        fontWeight: 600,
                        fontSize: 17,
                        color: '#1976d2',
                        padding: '14px 18px',
                        borderRadius: 8,
                        transition: 'background 0.2s',
                        cursor: 'pointer',
                      }}
                      onMouseOver={e => e.currentTarget.style.background = '#f0f7ff'}
                      onMouseOut={e => e.currentTarget.style.background = 'none'}
                    >
                      <span style={{ fontSize: 18, marginRight: 8, color: '#1976d2', display: 'flex', alignItems: 'center' }}>
                        <i className={`fas fa-${expandedSprint === sprint.id ? 'angle-down' : 'angle-right'}`}></i>
                      </span>
                      <Chip label={sprint.status} size="small" style={{ background: '#1976d2', color: '#fff', fontWeight: 600 }} />
                      <span style={{ fontWeight: 700, fontSize: 17 }}>{sprint.name}</span>
                      <span style={{ color: '#888', fontSize: 13, fontWeight: 400 }}>({sprint.startDate ? new Date(sprint.startDate).toLocaleDateString() : '—'} - {sprint.endDate ? new Date(sprint.endDate).toLocaleDateString() : '—'})</span>
                      <span style={{ marginLeft: 18, fontSize: 13, color: '#1976d2', fontWeight: 500, background: '#e3f0fc', borderRadius: 8, padding: '2px 10px' }}>
                        <i className="fas fa-list-ul" style={{ marginRight: 6 }}></i>
                        {allStories.length} stories
                        <span style={{ marginLeft: 8, color: '#43a047' }}><i className="fas fa-check-circle"></i> {done}</span>
                        <span style={{ marginLeft: 8, color: '#fbc02d' }}><i className="fas fa-spinner"></i> {inProgress}</span>
                        <span style={{ marginLeft: 8, color: '#1976d2' }}><i className="fas fa-circle"></i> {todo}</span>
                      </span>
                    </button>
                  </h2>
                  <div
                    id={`collapse${sprint.id}`}
                    className={`accordion-collapse collapse${expandedSprint === sprint.id ? ' show' : ''}`}
                    aria-labelledby={`heading${sprint.id}`}
                    data-bs-parent="#backlogAccordion"
                  >
                    <div className="accordion-body" style={{ background: '#fafdff', borderRadius: 8, boxShadow: '0 1px 3px #e0e4ea', padding: 18 }}>
                      {expandedSprint === sprint.id && <KanbanView sprint={sprint} />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {/* Floating Add Sprint Button */}
        <Tooltip title="Add Sprint" arrow>
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
            aria-label="Add Sprint"
            onClick={() => alert('Add Sprint (feature coming soon!)')}
          >
            <i className="fas fa-plus"></i>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Backlog;
