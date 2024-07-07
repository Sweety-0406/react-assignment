import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography } from '@mui/material';

const FirstPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phone || !email) {
      setError('All fields are required.');
      return;
    }
    localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
    navigate('/second');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" fontFamily={'serif'} gutterBottom>First Page</Typography>
      {error && <Typography fontFamily={'serif'} color="error">{error}</Typography>}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button  variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Container>
  );
};

export default FirstPage;
