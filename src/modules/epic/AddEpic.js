import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const AddEpic = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('New');
  const [priority, setPriority] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add API call to create epic
    // Example: axios.post(...)
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
          Add Epic
        </Button>
      </Box>
    </Box>
  );
};

export default AddEpic;
