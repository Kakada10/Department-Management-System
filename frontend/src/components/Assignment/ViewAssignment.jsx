import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams } from 'react-router';
import axios from "axios";
import { useEffect } from 'react';
import { useState } from 'react';

const AssignmentDetail = () => {
  const [assignment, setAssignment] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  let id = window.location.pathname.substr(24);

  useEffect(() => {
    assignments();
  }, [])

  // const handleFileInput = (file) => {
  //   setSelectedFile(file);
  //   console.log(file)
  // };

  const assignments = async () => {
      axios.post("http://localhost:3000/teacher/viewDetail/assignment",{assignment_id: id},{ withCredentials: true })
        .then((result) => {
          setAssignment(result.data.results[0]);
          console.log(assignment)
          })
        .catch(error => console.log(error));
  }

  // uploadfile
  const handleUpload = (e) => {
    e.preventDefault();
    // You can now upload the selected file to the server or perform any other action
    console.log(selectedFile);
  };

  // formsubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>View Assignment</h2>
      </Box>

      <Box sx={{ width: '80%', ml: '3%' }}>
        <Card>
          <Box
            sx={{
              // width: '75%',
              // ml: '3%',
              display: 'flex',
              justifyContent: 'space-between',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <Button
              style={{ height: 40 }}
              startIcon={<ArrowBackIosIcon style={{ color: 'blue' }} />}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/course/List-assignment/${assignment._course_id}`}
              >
                <p style={{ color: 'blue' }}>Back</p>
              </Link>
            </Button>

            {/* <Button>
          back
        </Button> */}

            <Button style={{ backgroundColor: 'green', height: 40 }}>
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                // to={`/course/add-assignment/${id}`}
              >
                <p style={{ color: 'white' }}>Turn In</p>
              </Link>
            </Button>
          </Box>
          <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}
      >
          <CardContent>
          <Box
            sx={{
              // width: '75%',
              // ml: '3%',
              display: 'flex',
              justifyContent: 'space-between',
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <div>
            <Typography variant="h4" gutterBottom>
              {assignment._title}
              {/* {assignment.title} */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Due date: {assignment._dateline}
              {/* Due Date: {assignment.dueDate} */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              <p>Description:</p>
              <p>
               {assignment._desc}
              </p>
              {/* Assigned To: {assignment.assignedTo} */}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              My work:
              <Box sx={{mb: 1 , mt: 3}}>
        <form onSubmit={handleUpload}>
        <iframe width="290px" height="220px" overflow= "hidden" scrolling="no" frameBorder="none" src={assignment._file}></iframe>
    </form>
    
    </Box>
            </Typography>
            </div>
            <div>
              Point: 0/{assignment._score}
            </div>
            </Box>
          </CardContent>
          </Box>

        </Card>
      </Box>
    </>
  );
};

export default AssignmentDetail;
