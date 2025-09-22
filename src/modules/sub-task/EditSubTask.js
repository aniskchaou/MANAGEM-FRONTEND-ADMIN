import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';

const EditSubtask = ({ subtask = {}, closeModal }) => {
  const [name, setName] = useState(subtask.name || '');
  const [task, setTask] = useState(subtask.task || '');
  const [status, setStatus] = useState(subtask.status || '');

  useEffect(() => {
    setName(subtask.name || '');
    setTask(subtask.task || '');
    setStatus(subtask.status || '');
  }, [subtask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to update subtask
    closeModal();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2 }}>
      <TextField
        label="Subtask Name"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Parent Task"
        value={task}
        onChange={e => setTask(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Status"
        value={status}
        onChange={e => setStatus(e.target.value)}
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

export default EditSubtask;
