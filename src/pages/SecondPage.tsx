import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from '../components/DepartmentList';

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem('userDetails');
    if (!userDetails) {
      navigate('/');
      return;
    }
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'body', headerName: 'Body', width: 400 },
  ];

  return (
    <Container maxWidth="lg">
      <Typography  fontFamily={'serif'} variant="h4" gutterBottom>Second Page</Typography>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid  rows={posts} columns={columns}  checkboxSelection />
      </div>
      <DepartmentList />
    </Container>
  );
};

export default SecondPage;
