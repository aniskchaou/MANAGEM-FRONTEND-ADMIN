import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddSubtask = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [task, setTask] = useState('');
  const [status, setStatus] = useState('New');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to create subtask
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
          Add Subtask
        </Button>
      </Box>
    </Box>
  );
};

export default AddSubtask;
