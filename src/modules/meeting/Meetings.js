import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Tabs, Tab, Box, Chip, IconButton, Tooltip, Button, TextField, LinearProgress } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Meetings = () => {
  const [meetings, setMeetings] = useState([
    {
      id: 1,
      title: 'Sprint Planning Meeting',
      project: 'Alpha CRM',
      date: 'Sep 25, 2025',
      time: '10:00 AM - 11:00 AM',
      timezone: 'GMT+1',
      status: 'Scheduled',
      organizer: 'Alice',
      participants: ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank'],
      agenda: ['Review backlog', 'Assign stories', 'Set sprint goals'],
      actionItems: [
        { title: 'Assign user stories', status: 'Open', dueDate: 'Sep 26, 2025' },
        { title: 'Update sprint board', status: 'Open', dueDate: 'Sep 26, 2025' },
        { title: 'Send meeting notes', status: 'Open', dueDate: 'Sep 25, 2025' },
      ],
    },
    {
      id: 2,
      title: 'Retrospective',
      project: 'Alpha CRM',
      date: 'Sep 29, 2025',
      time: '3:00 PM - 4:00 PM',
      timezone: 'GMT+1',
      status: 'Scheduled',
      organizer: 'Bob',
      participants: ['Alice', 'Bob', 'Carol', 'Dave'],
      agenda: ['Discuss what went well', 'Identify improvements', 'Plan next sprint'],
      actionItems: [
        { title: 'Document feedback', status: 'Open', dueDate: 'Sep 30, 2025' },
      ],
    },
    {
      id: 3,
      title: 'Client Demo',
      project: 'Beta ERP',
      date: 'Sep 28, 2025',
      time: '2:00 PM - 2:45 PM',
      timezone: 'GMT+1',
      status: 'Completed',
      organizer: 'Carol',
      participants: ['Carol', 'Dave', 'Eve', 'Client'],
      agenda: ['Demo new features', 'Q&A', 'Collect feedback'],
      actionItems: [
        { title: 'Send demo recording', status: 'Done', dueDate: 'Sep 28, 2025' },
      ],
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [tab, setTab] = useState(0);

  // useEffect(() => {
  //   fetchMeetings();
  // }, []);

  // const fetchMeetings = async () => {
  //   setLoading(true);
  //   try {
  //     // Replace with your API endpoint
  //     const res = await fetch('http://localhost:5000/meetings');
  //     const data = await res.json();
  //     setMeetings(data);
  //   } catch (e) {
  //     setMeetings([]);
  //   }
  //   setLoading(false);
  // };

  // Filtered meetings
  const filteredMeetings = meetings.filter(
    m =>
      m.title?.toLowerCase().includes(search.toLowerCase()) ||
      m.organizer?.toLowerCase().includes(search.toLowerCase()) ||
      m.status?.toLowerCase().includes(search.toLowerCase())
  );

  // Card view actions
  const handleOpenDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setDetailsOpen(true);
    setTab(0);
  };
  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedMeeting(null);
  };

  // Summary stats
  const totalMeetings = meetings.length;
  const scheduled = meetings.filter(m => m.status === 'Scheduled').length;
  const completed = meetings.filter(m => m.status === 'Completed').length;

  return (
    <div style={{ position: 'relative', maxWidth: 1200, margin: '40px auto' }}>
      <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', marginBottom: 24 }}>
        <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fas fa-handshake" style={{ marginRight: 10 }}></i> Meetings</h4>
            <Tooltip title="This page shows meetings. Use the search bar to filter." arrow>
              <IconButton size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><InfoOutlinedIcon /></IconButton>
            </Tooltip>
          </div>
          <div style={{ minWidth: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by title, organizer, or status..."
              style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 180 }}
              aria-label="Search meetings"
            />
          </div>
        </div>
        <div className="card-body" style={{ padding: 24 }}>
          <div style={{ display: 'flex', gap: 18, marginBottom: 12, alignItems: 'center', fontWeight: 600, fontSize: 15, color: '#1976d2' }}>
            <span><i className="fas fa-list-ul" style={{ marginRight: 6 }}></i> Total Meetings: {totalMeetings}</span>
            <span><i className="fas fa-calendar-check" style={{ marginRight: 6, color: '#43a047' }}></i> Scheduled: {scheduled}</span>
            <span><i className="fas fa-check-circle" style={{ marginRight: 6, color: '#1976d2' }}></i> Completed: {completed}</span>
          </div>
          {loading ? <LinearProgress /> : (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
              {filteredMeetings.length === 0 ? (
                <div style={{ color: '#888', fontSize: 18, fontWeight: 500, padding: 32 }}>No meetings found. Schedule a meeting to get started!</div>
              ) : filteredMeetings.map(meeting => (
                <div key={meeting.id} className="meeting-card" style={{ background: '#e3f2fd', borderRadius: 14, boxShadow: '0 2px 8px #1976d233', padding: 22, minWidth: 340, maxWidth: 400, flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: 10, position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: 18 }}><i className="fas fa-calendar-alt" style={{ marginRight: 8, color: '#1976d2' }}></i> {meeting.title}</span>
                    <Chip label={meeting.status} color={meeting.status === 'Scheduled' ? 'info' : meeting.status === 'Completed' ? 'success' : 'default'} size="small" />
                  </div>
                  <div style={{ fontSize: 15, color: '#1565c0', marginBottom: 2 }}><i className="fas fa-project-diagram" style={{ marginRight: 6 }}></i> Project: {meeting.project || 'N/A'}</div>
                  <div style={{ fontSize: 15 }}><i className="fas fa-clock" style={{ marginRight: 6 }}></i> {meeting.date} | {meeting.time} ({meeting.timezone || 'GMT'})</div>
                  <div style={{ fontSize: 15 }}><i className="fas fa-users" style={{ marginRight: 6 }}></i> {meeting.participants?.length || 0} Participants</div>
                  <div style={{ fontSize: 15 }}><i className="fas fa-list-alt" style={{ marginRight: 6 }}></i> Agenda: {meeting.agenda?.join(', ') || 'N/A'}</div>
                  <div style={{ fontSize: 15 }}><i className="fas fa-tasks" style={{ marginRight: 6 }}></i> {meeting.actionItems?.length || 0} Action Items</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleOpenDetails(meeting)}>Join</Button>
                    <Button variant="outlined" color="info" size="small" onClick={() => handleOpenDetails(meeting)}>Notes</Button>
                    <Button variant="outlined" color="success" size="small" onClick={() => handleOpenDetails(meeting)}>Summary</Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Floating Schedule Button */}
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
        aria-label="Schedule Meeting"
      >
        <i className="far fa-plus-square"></i>
      </Button>
      {/* Meeting Details Modal */}
      <Dialog open={detailsOpen} onClose={handleCloseDetails} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedMeeting?.title} <span style={{ fontSize: 15, color: '#1976d2', marginLeft: 12 }}><i className="fas fa-project-diagram" style={{ marginRight: 6 }}></i> {selectedMeeting?.project}</span>
          <span style={{ float: 'right', fontSize: 15, color: '#43a047' }}>{selectedMeeting?.date} | {selectedMeeting?.time} ({selectedMeeting?.timezone})</span>
        </DialogTitle>
        <DialogContent>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="Meeting Tabs" style={{ marginBottom: 18 }}>
            <Tab label={<span><i className="fas fa-list-alt" style={{ marginRight: 6 }}></i> Agenda</span>} />
            <Tab label={<span><i className="fas fa-sticky-note" style={{ marginRight: 6 }}></i> Notes</span>} />
            <Tab label={<span><i className="fas fa-tasks" style={{ marginRight: 6 }}></i> Action Items</span>} />
            <Tab label={<span><i className="fas fa-history" style={{ marginRight: 6 }}></i> History</span>} />
          </Tabs>
          {/* Agenda Tab */}
          {tab === 0 && (
            <Box>
              <h5>Agenda</h5>
              <ol>
                {(selectedMeeting?.agenda || []).map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
              <Button variant="outlined" color="primary" size="small">Edit Agenda</Button>
            </Box>
          )}
          {/* Notes Tab */}
          {tab === 1 && (
            <Box>
              <h5>Notes</h5>
              <TextField multiline minRows={4} fullWidth placeholder="Type meeting notes here... Use @mentions to tag participants." variant="outlined" />
              <Button variant="outlined" color="info" size="small" style={{ marginTop: 8 }}>Save Notes</Button>
            </Box>
          )}
          {/* Action Items Tab */}
          {tab === 2 && (
            <Box>
              <h5>Action Items</h5>
              <ul>
                {(selectedMeeting?.actionItems || []).map((item, idx) => (
                  <li key={idx}>{item.title} <Chip label={item.status} size="small" style={{ marginLeft: 8 }} /> <span style={{ color: '#1976d2', marginLeft: 8 }}>Due: {item.dueDate}</span></li>
                ))}
              </ul>
              <Button variant="outlined" color="success" size="small">Add Action Item</Button>
            </Box>
          )}
          {/* History Tab */}
          {tab === 3 && (
            <Box>
              <h5>History</h5>
              <div style={{ color: '#888', fontSize: 15 }}>Previous meetings, attached recordings, and AI summaries will appear here.</div>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Meetings;
