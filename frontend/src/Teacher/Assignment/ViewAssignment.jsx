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

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

import {DeleteAssignment} from './DeleteAssignment'

const AssignmentDetail = () => {
  const [assignment, setAssignment] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  let id = window.location.pathname.substr(32);

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

      <Box sx={{ width: '30%', marginLeft: '3%' }}>
        <Tabs aria-label="tabs">
          <TabList
              variant="plain"
              sx={{
                '--List-padding': '0px',
                '--List-radius': '0px',
                '--ListItem-minHeight': '48px',
                [`& .${tabClasses.root}`]: {
                  boxShadow: 'none',
                  fontWeight: 'md',
                  [`&.${tabClasses.selected}::before`]: {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                    right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                    bottom: 0,
                    height: 3,
                  },
                },
              }}
          >
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/view_assignmentdetail/${id}`}
              >
                View Detail
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/tograde/${id}`}
              >
                To Grade
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/graded/${id}`}
              >
                Graded
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/delay/${id}`}
              >
                Delay
              </Link>
            </Tab>
          </TabList>
        </Tabs>
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
              style={{ height: 40 , marginLeft: 20, marginTop: 20 }}
              startIcon={<ArrowBackIosIcon style={{ color: 'blue' }} />}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/teacher/course/assignment_list/${assignment._course_id}`}
              >
                <p style={{ color: 'blue' }}>Back</p>
                
              </Link>

              {/* </Link> */}
              {/* </Button> */}

            </Button>
            <div style={{ padding: '20px' }}>
              <Button
                style={{
                  backgroundColor: 'blue',
                  height: 30,
                  paddingTop: 13,
                  marginRight: '5px',
                }}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/teacher/course/edit_assignment/${id}`}
                >
                  {/* <p style={{ color: 'white' }}>Edit</p> */}
                  <ModeEditIcon />
                </Link>
              </Button>

              <Button
                style={{ backgroundColor: 'red', height: 30, width: '20px' }}
              >
                <DeleteAssignment />
              </Button>
              {/* </Link> */}
              {/* </Button> */}
            </div>

            {/* <Button>
          back
        </Button> */}
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
              Due date: {assignment._dueDate}
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
              File:
              <Box sx={{mb: 1 , mt: 3}}>
        <form onSubmit={handleUpload}>
        <iframe width="290px" height="190px" overflow= "hidden" scrolling="no" frameBorder="none" src={assignment._file}></iframe>
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
