import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import Navbar from '../navbar/Navbar';
import axios from "axios";
import { BiChevronLeft } from 'react-icons/bi';
import { useState,useEffect } from 'react';
// import { courses } from '../../variable/constrant';
import { Link, NavLink, useNavigate } from 'react-router-dom';

export default function SingleCourse() {
  var [course, setCourse] = useState([]);
  const navigate = useNavigate();
  const currentPath = window.location.pathname.substr(9)

  function navigateHandler(id) {
    navigate(`/course/student-list/${id}`);
  }
  
  useEffect(() => {
      courses()
  }, [])

  const courses = async () => {
    if(localStorage.getItem("role")==="student"){
      axios.post("http://localhost:3000/student/view/course",{course_id: currentPath},{ withCredentials: true })
      .then((result) => {
        setCourse(result.data.results[0])
        })
      .catch(error => console.log(error));
    }else if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/view/course",{course_id: currentPath},{ withCredentials: true })
      .then((result) => {
        setCourse(result.data.results[0])
        // console.log(result.data.results)
        })
      .catch(error => console.log(error));
    }
  };
  // const { image, course_name, creator } = courses[id];
  return (
    <Box component="div">
      <Navbar />
      <Box component="div" mt="20px" display="flex">
        <BiChevronLeft size="2rem" />
        <Box
          component="span"
          fontSize="15px"
          fontWeight="bold"
          mt="5px"
          text-decoration="none"
        >
          <NavLink to="/">
            <span>All courses</span>
          </NavLink>
        </Box>
      </Box>
      <Box
        component="div"
        mt="20px"
        ml="10px"
        width="100%"
        // height="400px"
        display="flex"
      >
        <Box component="div" height="50%" width="20%">
          <img height="100%" width="100%" src="https://www.classcentral.com/report/wp-content/uploads/2022/06/C-Programming-BCG-Banner.png" alt="" />
        </Box>
        <Box component="div" ml="10px">
          <Typography variant="h5">{course.course_name}</Typography>
          <Typography
            component="span"
            mt="10px"
            fontSize="12.5px"
            fontWeight="500"
            color="rgba(0,0,0,0.6)"
          >
            Lecturer by {course.name}
          </Typography>
          <Box component="div" mt="73px" display="flex">
            <Button
              onClick={() => navigateHandler(course.course_id)}
              mt="50px"
              variant="outlined"
            >
              List student
            </Button>
            <Box component="div" ml="10px">
              <Button variant="contained" color="success">
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/course/session-list/${course.course_id}`}
                >
                  List session
                </Link>
              </Button>
            </Box>
            <Box component="div" ml="10px">
              <Button variant="contained" color="success">
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/course/List-assignment/${course.course_id}`}
                >
                  List Assignment
                </Link>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}