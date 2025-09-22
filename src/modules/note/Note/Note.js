import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './Note.css';
import AddNote from './../AddNote/AddNote';
import EditNote from './../EditNote/EditNote';
import ViewNote from './../ViewNote/ViewNote';
import { LoadJS } from '../../../libraries/datatables/datatables';
import useForceUpdate from 'use-force-update';
import showMessage from '../../../libraries/messages/messages';
import noteMessage from '../../../main/messages/noteMessage';
import NoteTestService from '../../../main/mocks/NoteTestService';
import HTTPService from '../../../main/services/userHTTPService';
import noteHTTPService from '../../../main/services/noteHTTPService';
import { Typography, Button, LinearProgress, Tooltip, Chip } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import CurrentUser from '../../../main/config/user';
// ...existing code...

const Note = () => {

  const [notes, setNotes] = useState([]);
  const [updatedItem, setUpdatedItem] = useState({});
  const forceUpdate = useForceUpdate();
  const [loading, setLoading] = useState(false);
  const closeButtonEdit = useRef(null);
  const closeButtonAdd = useRef(null);
  const [view, setView] = useState('table');

  const closeModalEdit = (data) => {
    resfresh()
    closeButtonEdit.current.click()
  }

  const closeModalAdd = (data) => {
    resfresh()
    closeButtonAdd.current.click()
  }


  useEffect(() => {
    LoadJS()
    retrieveNotes()
  }, []);



  const retrieveNotes = () => {
    noteHTTPService.getAllNote().then(data => {
      console.log(data.data)
      setNotes(data.data);
    });

  };

  const resfresh = () => {
    retrieveNotes()
    forceUpdate()
  }

  const remove = (e, data) => {
    e.preventDefault();
    var r = window.confirm(CurrentUser.DELTE_MSG);
    if (r) {

      noteHTTPService.removeNote(data).then(data => {
        showMessage('Confirmation', noteMessage.delete, 'success')
        resfresh()
      })
      //removeOne(data)
      resfresh()
    }

  }

  const update = (e, data) => {
    e.preventDefault();
    setUpdatedItem(data)
    resfresh()
  }
  const columns = [
    { field: 'id', headerName: '#', width: 200 },
    { field: 'name', headerName: 'Title', width: 200 },
    { field: 'description', headerName: 'Description', width: 200 }
  ];


  const handleRowSelection = (e) => {
    if (e.length == 1) {

      setUpdatedItemId(e[0])
      const selectedItem = notes.find(item => item.id == e[0])
      setUpdatedItem(selectedItem)
      console.log(updatedItem);
    }
    setUpdatedItemIds(e)

  }
  const [updatedItemId, setUpdatedItemId] = useState(0);
  const [updatedItemIds, setUpdatedItemIds] = useState([]);
  const [showFilter, setShowFilter] = useState(false);


  const demoNotes = [
    {
      id: 1,
      title: 'Sprint 21 Planning Notes',
      author: 'Sarah',
      date: '2025-09-22',
      linkedTo: 'Sprint 21',
      tags: ['planning', 'sprint21'],
      pinned: true,
      body: `# Sprint 21 Planning Notes\n- Goal: Finish payment integration\n- Stories selected: 8\n- Risks: Resource shortage in QA\n- Decisions: Move testing to Sprint 22 if blocked`,
      attachments: ['design.png', 'budget.xlsx'],
      linkedItems: ['Sprint 21', 'Project Alpha'],
      comments: [
        { author: 'Mike', text: '@Mike please confirm testing resources.' }
      ],
      lastEdited: '2025-09-22',
    },
    {
      id: 2,
      title: 'Alpha CRM Kickoff Minutes',
      author: 'John',
      date: '2025-09-20',
      linkedTo: 'Project A',
      tags: ['kickoff', 'projectA'],
      pinned: false,
      body: `# Alpha CRM Kickoff Minutes\n- Agenda: Project launch\n- Decisions: Use React for frontend\n- Next steps: Setup repo, onboard team`,
      attachments: ['agenda.pdf'],
      linkedItems: ['Project A'],
      comments: [
        { author: 'Sarah', text: '@Sarah please share repo link.' }
      ],
      lastEdited: '2025-09-20',
    },
    {
      id: 3,
      title: 'Ideas for Beta App Features',
      author: 'Mike',
      date: '2025-09-18',
      linkedTo: 'Beta App',
      tags: ['ideas', 'betaapp'],
      pinned: false,
      body: `# Ideas for Beta App Features\n- Feature: Dark mode\n- Feature: Push notifications\n- Feature: Offline sync`,
      attachments: [],
      linkedItems: ['Beta App'],
      comments: [],
      lastEdited: '2025-09-18',
    },
  ];

  const Note = () => {
    const [notes, setNotes] = useState(demoNotes);
    const [search, setSearch] = useState("");
    const [filterProject, setFilterProject] = useState("");
    const [filterAuthor, setFilterAuthor] = useState("");
    const [filterTag, setFilterTag] = useState("");
    const [filterDate, setFilterDate] = useState("");
    const [selectedNote, setSelectedNote] = useState(demoNotes[0]);

    // Filtered notes
    const filteredNotes = notes.filter(n => {
      let match = true;
      if (search.trim()) {
        const s = search.toLowerCase();
        match = n.title?.toLowerCase().includes(s) || n.author?.toLowerCase().includes(s) || n.tags.join(' ').toLowerCase().includes(s);
      }
      if (filterProject) match = match && n.linkedTo === filterProject;
      if (filterAuthor) match = match && n.author === filterAuthor;
      if (filterTag) match = match && n.tags.includes(filterTag);
      if (filterDate) match = match && n.date === filterDate;
      return match;
    });

    return (
      <div className="card" style={{ background: '#fafdff', borderRadius: 16, boxShadow: '0 4px 16px #e0e4ea55', border: 'none', position: 'relative' }}>
        {/* Dashboard Header & Filters */}
        <div className="card-header" style={{ background: 'linear-gradient(90deg, #1976d2 0%, #43a047 100%)', borderRadius: '16px 16px 0 0', color: '#fff', boxShadow: '0 2px 8px #e0e4ea33', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <h4 style={{ margin: 0, fontWeight: 700, fontSize: 22, letterSpacing: 1 }}><i className="menu-icon fa fa-clipboard-list" style={{ marginRight: 10 }}></i> Notes</h4>
            <Tooltip title="Notes dashboard: search, filter, create, AI summary, export." arrow>
              <Button size="small" style={{ color: '#fff', marginLeft: 8 }} aria-label="Help"><i className="fas fa-info-circle"></i></Button>
            </Tooltip>
          </div>
          <div style={{ minWidth: 620, display: 'flex', alignItems: 'center', gap: 8 }}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." style={{ padding: '7px 14px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 140 }} aria-label="Search notes" />
            <select value={filterProject} onChange={e => setFilterProject(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
              <option value="">Project</option>
              {notes.map(n => <option key={n.id} value={n.linkedTo}>{n.linkedTo}</option>)}
            </select>
            <select value={filterAuthor} onChange={e => setFilterAuthor(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
              <option value="">Author</option>
              {notes.map(n => <option key={n.id} value={n.author}>{n.author}</option>)}
            </select>
            <select value={filterTag} onChange={e => setFilterTag(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', minWidth: 120 }}>
              <option value="">Tag</option>
              {notes.flatMap(n => n.tags).map((tag, i) => <option key={i} value={tag}>{tag}</option>)}
            </select>
            <input type="date" value={filterDate} onChange={e => setFilterDate(e.target.value)} style={{ padding: '7px 8px', borderRadius: 8, border: '1px solid #e0e4ea', fontSize: 15, outline: 'none', width: 120 }} aria-label="Date" />
            <Button variant="contained" color="primary" size="small"><i className="far fa-plus-square"></i> New Note</Button>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-export"></i> Export PDF</Button>
            <Button variant="outlined" color="primary" size="small"><i className="fas fa-file-excel"></i> Export Excel</Button>
            <Button variant="outlined" color="info" size="small"><i className="fas fa-robot"></i> AI Summary</Button>
          </div>
        </div>
        {/* Notes Table */}
        <div className="card-body" style={{ padding: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <table style={{ width: '100%', background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', marginBottom: 12 }}>
              <thead>
                <tr style={{ background: '#f5f7fa', fontWeight: 600 }}>
                  <td>Note Title</td>
                  <td>Linked To</td>
                  <td>Author</td>
                  <td>Date</td>
                  <td>Pinned</td>
                </tr>
              </thead>
              <tbody>
                {filteredNotes.map(n => (
                  <tr key={n.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedNote(n)}>
                    <td>{n.title}</td>
                    <td>{n.linkedTo}</td>
                    <td>{n.author}</td>
                    <td>{n.date}</td>
                    <td>{n.pinned ? <i className="fas fa-thumbtack" style={{ color: '#ffa726' }}></i> : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Note Detail View */}
          {selectedNote && (
            <div style={{ background: '#f5f7fa', borderRadius: 8, padding: 18, boxShadow: '0 2px 8px #e0e4ea33', marginBottom: 24, display: 'flex', gap: 32 }}>
              <div style={{ flex: 3 }}>
                <h5 style={{ fontWeight: 700, marginBottom: 8 }}>{selectedNote.title}</h5>
                <div style={{ marginBottom: 8 }}><b>Author:</b> {selectedNote.author} | <b>Created:</b> {selectedNote.date} | <b>Last Edited:</b> {selectedNote.lastEdited}</div>
                <div style={{ marginBottom: 8 }}><b>Linked To:</b> {selectedNote.linkedTo}</div>
                {/* Rich Text Body */}
                <div style={{ background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 18, marginBottom: 12, fontSize: 16, fontFamily: 'inherit', whiteSpace: 'pre-line' }}>
                  {selectedNote.body}
                </div>
                {/* Attachments */}
                <div style={{ marginBottom: 8 }}>
                  <b>Attachments:</b> {selectedNote.attachments.map((a, i) => (
                    <span key={i} style={{ marginRight: 8 }}><i className="fas fa-paperclip" style={{ marginRight: 4 }}></i>{a}</span>
                  ))}
                </div>
                {/* Comments Section */}
                <div style={{ marginBottom: 8 }}>
                  <b>Comments:</b>
                  {selectedNote.comments.map((c, i) => (
                    <div key={i} style={{ marginLeft: 12, color: '#1976d2' }}><i className="fas fa-comment" style={{ marginRight: 6 }}></i> {c.text}</div>
                  ))}
                </div>
              </div>
              {/* Sidebar (Right) */}
              <div style={{ flex: 1, background: '#fff', borderRadius: 8, boxShadow: '0 1px 4px #ddd', padding: 12 }}>
                <div style={{ marginBottom: 8 }}><b>Tags:</b> {selectedNote.tags.map((tag, i) => (
                  <Chip key={i} label={`#${tag}`} color="info" size="small" style={{ marginRight: 4 }} />
                ))}</div>
                <div style={{ marginBottom: 8 }}><b>Linked Items:</b> {selectedNote.linkedItems.join(', ')}</div>
                <div style={{ marginBottom: 8 }}><b>AI Summary:</b> <span style={{ fontStyle: 'italic', color: '#888' }}>[Demo] "Sprint 21: 8 stories, QA risk, testing moved to Sprint 22."</span></div>
                <div style={{ marginBottom: 8 }}><b>Export:</b> <Button variant="outlined" color="primary" size="small">PDF</Button> <Button variant="outlined" color="primary" size="small">Word</Button> <Button variant="outlined" color="primary" size="small">Markdown</Button></div>
              </div>
            </div>
          )}
          {/* Floating New Note Button */}
          <Tooltip title="New Note" arrow>
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
              aria-label="New Note"
            >
              <i className="fas fa-plus"></i>
            </button>
          </Tooltip>
        </div>
      </div>
    );

  };

}

export default Note;
