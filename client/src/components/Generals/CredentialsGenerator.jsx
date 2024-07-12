import React, { useState } from 'react';
import { Button, TextField, Box, Snackbar, Alert } from '@mui/material';

const generateCredentials = () => {
  const id = `user-${Math.random().toString(36).substring(2, 8)}`;
  const password = Math.random().toString(36).substring(2, 10);
  return { id, password };
};

const CredentialsGenerator = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [credSnackbarOpen, setCredSnackbarOpen] = useState(false);

  const handleGenerate = () => {
    setCredentials(generateCredentials());
  };

  const handleCopy = () => {
    const text = `ID: ${credentials.id}, Password: ${credentials.password}`;
    navigator.clipboard.writeText(text).then(() => {
      setCredSnackbarOpen(true);
    });
  };

  const handleCloseSnackbar = () => {
    setCredSnackbarOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button variant="outlined" onClick={handleGenerate}>
        Generate Credentials
      </Button>
      <TextField label="ID" value={credentials.id} readOnly fullWidth />
      <TextField label="Password" value={credentials.password} readOnly fullWidth />
      <Button variant="contained" color="primary" onClick={handleCopy}>
        Copy to Clipboard
      </Button>
      <Snackbar
        open={credSnackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Credentials copied to clipboard!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CredentialsGenerator;
