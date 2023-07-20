import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export const DeleteAssignment = ({ onDelete }) => {
  const [open, setOpen] = useState(false);
  let currentPath = window.location.pathname.substr(32);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    let course_id = localStorage.getItem('course_id')
    axios.post("http://localhost:3000/teacher/delete/assignment",{assignment_id: currentPath},{ withCredentials: true })
    setOpen(false);
    window.location.replace(`/teacher/course/assignment_list/${course_id}`)
  };

  return (
    <div>
      {/* <Button variant="contained" color="secondary" onClick={handleOpen}> */}
      <Button
        style={{ textDecoration: 'none', color: 'white' }}
        onClick={handleOpen}
      >
        <DeleteIcon />
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this assignment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} style={{backgroundColor: 'red', color: 'white'}}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

