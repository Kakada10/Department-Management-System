import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import Navbar from '../navbar/Navbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

import ModeEditIcon from '@mui/icons-material/ModeEdit';

import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';

const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const AssignmentDetail = () => {
  const [assignment, setAssignment] = useState([]);
  const [submission, setSubmission] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  let id = window.location.pathname.substr(32);
  const [inputFile, setInputFile] = useState([]);
  useEffect(() => {
    submissions();
  }, []);

  // const assignments = async () => {
  //   axios
  //     .post(
  //       'http://localhost:3000/student/viewAll/assignments',
  //       { course_id: id },
  //       {
  //         withCredentials: true,
  //       }
  //     )
  //     .then((result) => {
  //       setAssignment(result.data.results[0]);
  //       console.log(assignment);
  //     })
  //     .catch((error) => console.log(error));
  // };

  const submissions = async () => {
    axios
      .post(
        'http://localhost:3000/student/viewDetail/assignment',
        { assignment_id: id },
        { withCredentials: true }
      )
      .then((result) => {
        setSubmission(result.data.results[0]);
        console.log(result.data.results[0]);
      })
      .catch((error) => console.log(error));
  };

  const submit = async () => {
    var now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const date =
      now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();
    const hour = now.getHours();
    const minute = now.getMinutes();
    axios
      .post(
        'http://localhost:3000/student/submit/assignment',
        {
          assignment_id: id,
          day: day,
          date: date,
          time: time,
          month: month,
          year: year,
          hour: hour,
          minute: minute,
          file: inputFile,
        },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          if (result.data.results === 'no') {
            alert('Assignment already closed ! Submit unsuccessfully !');
          } else {
            const course_id = localStorage.getItem('course_id');
            alert('Assignment Submit Successfully!');
            window.location.replace(
              '/student/course/assignment_list/' + course_id
            );
          }
          // console.log(result.data.results[0])
        }
      })
      .catch((error) => console.log(error));
  };

  const handleFileInput = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    console.log(base64);
    setInputFile(base64);
  };
  function handleFileReturn() {
    if (
      submission._submitFile !== '' &&
      submission._submitFile !== 'N/A' &&
      submission._submitFile !== null
    ) {
      return (
        <Box sx={{ mb: 1, mt: 3 }}>
          <form>
            <iframe
              width="290px"
              height="190px"
              overflow="hidden"
              scrolling="no"
              frameBorder="none"
              src={submission._submitFile}
            ></iframe>
          </form>
        </Box>
      );
    } else {
      return (
        <Box sx={{ mb: 3 }}>
          <form>
            <input type="file" onChange={handleFileInput} />
          </form>
        </Box>
      );
    }
  }
  console.log(submission);

  function handleStatus() {
    if (
      submission._submitFile !== '' &&
      submission._submitFile !== 'N/A' &&
      submission._submitFile !== null
    ) {
      return (
        <Button style={{ backgroundColor: 'green', height: 40 }}>
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            // to={`/student/course/add-assignment/${id}`}
          >
            <p style={{ color: 'white' }}>Turned In</p>
          </Link>
        </Button>
      );
    } else {
      return (
        <Button
          onClick={submit}
          style={{ backgroundColor: 'green', height: 40 }}
        >
          <Link style={{ textDecoration: 'none', color: 'white' }}>
            <p style={{ color: 'white' }}>Turn In</p>
          </Link>
        </Button>
      );
    }
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
  };

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
                // to={`/student/course/assignment_list/${id}`}
                to={`/student/course/assignment_list/${submission._course_id}`}
              >
                <p style={{ color: 'blue' }}>Back</p>
              </Link>
            </Button>

            {/* <Button>
          back
        </Button> */}
            {handleStatus()}
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
                    {submission._title}
                    {/* {assignment.title} */}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Due date: {submission._dueDate}
                    {/* Due Date: {assignment.dueDate} */}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    <p>Description:</p>
                    <p>{submission._desc}</p>
                    {/* Assigned To: {assignment.assignedTo} */}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    File:
                    <iframe
                      width="290px"
                      height="190px"
                      overflow="hidden"
                      scrolling="no"
                      frameBorder="none"
                      src={submission._file}
                    ></iframe>
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    My work:
                    {handleFileReturn()}
                  </Typography>
                </div>
                <div>
                  Point: {submission.S1}/{submission.S2}
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
