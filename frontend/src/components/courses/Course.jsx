import { Box, Button, Grid } from '@mui/material';
import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import { useState,useEffect } from 'react';
// import { courses } from '../../variable/constrant';

export default function Course() {
  var [course, setCourse] = useState([]);
  const navigate = useNavigate();
  
  function navigateHandler(index) {
    // console.log(index)
    localStorage.setItem("id",index);
    navigate(`/courses/${index}`);
  };

  useEffect(() => {
      courses()
  }, [])

  const courses = async () => {
      if(localStorage.getItem("role")==="student"){
        axios.get("http://localhost:3000/student/logined",{ withCredentials: true })
        .then((result) => {
          setCourse(result.data.results)
          })
        .catch(error => console.log(error));
      }else if(localStorage.getItem("role")==="teacher"){
        axios.get("http://localhost:3000/teacher/logined",{ withCredentials: true })
        .then((result) => {
          setCourse(result.data.results)
          // console.log(result.data.results)
          })
        .catch(error => console.log(error));
      }
  }
  return (
    <Box display="flex" gap="10px">
      {course.map((course, index) => (
        <Box component="div" key={course.course_id}>
          <Grid
            spacing={3}
            component="div"
            border="2px solid rgba(0, 0, 0, 0.1)"
            // height="400px"
            margin="14px 0"
            padding="1px"
          >
            <img height="100%" width="100%" src="https://www.classcentral.com/report/wp-content/uploads/2022/06/C-Programming-BCG-Banner.png" />
            <Box
              component="span"
              fontSize="15px"
              lineHeight="1.4"
              fontWeight="800"
            >
              {course.course_name}
            </Box>
            <Box component="div">
              <Box
                component="span"
                fontSize="12.5px"
                fontWeight="500"
                color="rgba(0,0,0,0.6)"
              >
                {'Lectuer By : '}
                {course.name}
              </Box>
            </Box>
            <Box component="div">
              <Box
                component="span"
                fontSize="12.5px"
                fontWeight="500"
                color="rgba(0,0,0,0.6)"
              >
                {''}
                {course.year}
              </Box>
            </Box>
            <Box component="div">
              <Box
                component="span"
                fontSize="12.5px"
                fontWeight="500"
                color="rgba(0,0,0,0.6)"
              >
                {''}
                {course.FromYear}
              </Box>
            </Box>
            <Box component="div">
              <Box
                component="span"
                fontSize="12.5px"
                fontWeight="500"
                color="rgba(0,0,0,0.6)"
              >
                {''}
                {course.ToYear}
              </Box>
            </Box>
            <Box
              component="div"
              mt="20px"
              justifyContent="center"
              display="flex"
            >
              <Button
                onClick={() => navigateHandler(course.course_id)}
                variant="contained"
                color="warning"
              >
                See detail
              </Button>
            </Box>
          </Grid>
        </Box>
      ))}
    </Box>
    );
  };