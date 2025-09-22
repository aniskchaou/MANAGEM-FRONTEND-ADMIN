import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EditEpic = ({ epic = {}, closeModal }) => {
  const [title, setTitle] = useState(epic.title || '');
  const [description, setDescription] = useState(epic.description || '');
  const [status, setStatus] = useState(epic.status || '');
  const [priority, setPriority] = useState(epic.priority || '');

  useEffect(() => {
    setTitle(epic.title || '');
    setDescription(epic.description || '');
    setStatus(epic.status || '');
    setPriority(epic.priority || '');
  }, [epic]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update epic
    // Example: axios.put(...)
    closeModal();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        multiline
        rows={3}
      />
      <TextField
        label="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Priority"
        value={priority}
        onChange={e => setPriority(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" color="primary" type="submit">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default EditEpic;
