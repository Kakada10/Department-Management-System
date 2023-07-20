import React from 'react'
import Navbar from '../navbar/Navbar'
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { useState, useEffect } from 'react';
import axios from "axios"; 
import TextField from '@mui/material/TextField';

export const ReturnSubmit = () => {
  const { id } = useParams();
   const [num, setNum] = useState(0)
   const [student2,setStudent2] = useState([])
   const [score,setScore] = React.useState('');
   const [feedback,setFeedback] = React.useState('');
   const [returnDate,setReturnDate] = React.useState('');
   const [returnTime,setReturnTime] = React.useState('');
   const [submitFile,setSubmitFile] = React.useState('');
   const theme = useTheme();
   const [activeStep, setActiveStep] = React.useState(0);
   let id2 = localStorage.getItem("Student_id")
   const [student_id, setStudent_id] = useState(id2)
   
   const handleNext = async () => {
     setActiveStep((prevActiveStep) => prevActiveStep + 1);
     const response = await axios.post("http://localhost:3000/teacher/return/assignment/student",{assignment_id:id,student_id : student2[activeStep+1].student_id},{ withCredentials: true })
        // setStudent(response.data.results[0]);
        setStudent_id(student2[activeStep+1].student_id)
        setScore(response.data.results[0].S2);

        if(response.data.results[0]._feedback===null){
          setFeedback('')
        }else{
          setFeedback(response.data.results[0]._feedback)
        }
        if(response.data.results[0]._submitFile===null){
          setSubmitFile('')
        }else{
          setSubmitFile(response.data.results[0]._submitFile)
        }

        var now = new Date();
        const assignDate =  now.getDate() + '-' + (now.getMonth() + 1) +'-'+ now.getFullYear();
        setReturnTime(now.getHours()+':'+now.getMinutes());
        setReturnDate(assignDate)
        localStorage.setItem('student_id',response.data.results[0].student_id)
        // console.log(response.data.results[0]);
   };

   const handleBack = async () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
      const response = await axios.post("http://localhost:3000/teacher/return/assignment/student",{assignment_id:id,student_id : student2[activeStep-1].student_id},{ withCredentials: true })
      // setStudent(response.data.results[0]);
      setStudent_id(student2[activeStep-1].student_id)
      setScore(response.data.results[0].S2);
      if(response.data.results[0]._feedback===null){
        setFeedback('')
      }else{
        setFeedback(response.data.results[0]._feedback)
      }
      if(response.data.results[0]._submitFile===null){
        setSubmitFile('')
      }else{
        setSubmitFile(response.data.results[0]._submitFile)
      }
      var now = new Date();
      const assignDate =  now.getDate() + '-' + (now.getMonth() + 1) +'-'+ now.getFullYear();
      setReturnTime(now.getHours()+':'+now.getMinutes());
      setReturnDate(assignDate)
      localStorage.setItem('student_id',response.data.results[0].student_id)
      console.log(response.data.results[0]);
    };

   const handleInputfeedback = async (e) => {
    setFeedback(e.target.value)
   }

   const handleInputScore = async (e) => {
    setScore(e.target.value)
  }

  const [student,setStudent] = useState([])
   
  useEffect(() => {
    Students();
  }, [])

  const Students = async () => {
    axios.get("http://localhost:3000/teacher/getStudent/assignment/"+id,{ withCredentials: true })
    .then((result) => {
      setStudent2(result.data.results);
      })
    .catch(error => console.log(error));
    const response = await axios.post("http://localhost:3000/teacher/return/assignment/student",{assignment_id:id,student_id : student_id},{ withCredentials: true })
        setStudent(response.data.results[0]);
        setScore(response.data.results[0].S2);
        setFeedback(response.data.results[0]._feedback)
        setSubmitFile(response.data.results[0]._submitFile)
        var now = new Date();
        const assignDate =  now.getDate() + '-' + (now.getMonth() + 1) +'-'+ now.getFullYear();
        setReturnTime(now.getHours()+':'+now.getMinutes());
        setReturnDate(assignDate)
  }
  
  function handleData () {
    return (
      <Box>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={8} style={{ marginTop: '-5%' }}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{ minHeight: '100vh' }}
              >
                <iframe
                  width="690px"
                  height="590px"
                  overflow="hidden"
                  scrolling="no"
                  frameBorder="none"
                  src={submitFile}
                ></iframe>
                {/* <h1>File turn in from student</h1> */}
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ marginLeft: '3%' }}>
                <MobileStepper
                  // variant="dots"
                  // steps={6}
                  position="static"
                  activeStep={activeStep}
                  sx={{ maxWidth: 400, flexGrow: 1 }}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === 5}
                    >
                      Next
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Box>
              <Box>
                <h2>File Turn In Title</h2>
                <p>{student._title}</p>
                <Divider />
                <h2>Feedback</h2>
                <TextField
                  multiline
                  rows={6}
                  placeholder="Type your feedback here"
                  variant="outlined"
                  defaultValue={feedback}
                  onChange={handleInputfeedback}
                  fullWidth
                  required
                />
                <Divider />
                <h2>Point</h2>
                <TextField
                  variant="outlined"
                  value={score}
                  onChange={handleInputScore}
                  width="50%"
                  required
                />
                <span style={{ margin: '30px' }}>/{student.S1}</span>
                {/* <Divider /> */}
                <Box sx={{ marginTop: '10px' }}>
                  <Button onClick={Submit} variant="contained">
                    Return
                  </Button>
                  <Link to={`/teacher/course/tograde/${id}`}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ marginLeft: '20px' }}
                    >
                      cancel
                    </Button>
                  </Link>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }

  const Submit = async (e) => {
    e.preventDefault();
    const student_id = localStorage.getItem('student_id')
    const response = await axios.post("http://localhost:3000/teacher/score/assignment",{returnDate: returnDate, returnTime: returnTime, feedback: feedback, score: score, assignment_id:id,student_id : student_id},{ withCredentials: true }) 
    .then((result)=>{
      window.location.replace("/teacher/course/tograde/"+id)
    })

  } 

  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Return Submitted</h2>
      </Box>

      <Box sx={{ marginLeft: '3%', marginBottom: '30px' }}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<BiChevronLeft fontSize="small" />}
        >
          {' '}
          <Link />
          <NavLink
            style={{ textDecoration: 'none' }}
            to={`/teacher/course/view_assignment/${id}`}
          >
            View Assignment
          </NavLink>
          <NavLink
            style={{ textDecoration: 'none' }}
            to={`/teacher/course/tograde/${id}`}
          >
            To Grade
          </NavLink>
          <Typography fontWeight="bold">Return Submit</Typography>
        </Breadcrumbs>
      </Box>
      <Box>
        
        {handleData()}
      </Box>
    </>
  );
}
