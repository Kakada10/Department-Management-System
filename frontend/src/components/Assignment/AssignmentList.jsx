import { Box } from '@mui/system';
import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
// import { Listdata } from './Listdata';

// import { courses } from '../../variable/constrant';
import { useNavigate } from 'react-router-dom';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Pagination from '@mui/material/Pagination';
import axios from "axios";
import { useState, useEffect } from 'react';

export default function AssignmentList() {
  const navigate = useNavigate();
  let currentPath = window.location.pathname.substr(24);
  var [assignment, setAssignment] = useState([]);
  const [group, setGroup] = React.useState('');
  var [course, setCourse] = useState([]);
  // pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleChange = (event) => {
    if(event.target.value==20){
      axios.post("http://localhost:3000/teacher/viewByGroup/assignments",{course_id: currentPath,group:"A"},{ withCredentials: true })
          .then((result) => {
            setAssignment(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==30){
      axios.post("http://localhost:3000/teacher/viewByGroup/assignments",{course_id: currentPath,group:"B"},{ withCredentials: true })
          .then((result) => {
            setAssignment(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==40){
      axios.post("http://localhost:3000/teacher/viewByGroup/assignments",{course_id: currentPath,group:"C"},{ withCredentials: true })
          .then((result) => {
            setAssignment(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==10){
      axios.post("http://localhost:3000/teacher/view/assignments",{course_id: currentPath},{ withCredentials: true })
          .then((result) => {
            setAssignment(result.data.results)
            })
          .catch(error => console.log(error));
    }
    setGroup(event.target.value);
  };
  
  useEffect(() => {
    assignments();
    courses();
  }, [])

  const assignments = async () => {
    if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/view/assignments",{course_id: currentPath},{ withCredentials: true })
        .then((result) => {
          setAssignment(result.data.results);
          console.log(result.data.results)
          })
        .catch(error => console.log(error));
    }
  }

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
        })
      .catch(error => console.log(error));
    }
  };

  function navigateHandler(id) {
    navigate(`/course/student-list/${id}`);
  }

  return (
    <Box component="div">
      <Navbar />
      <Box component="div" mt="20px" display="flex">
        <BiChevronLeft size="2rem" />
        <Box component="span" fontSize="15px" fontWeight="bold" mt="5px">
          <NavLink style={{ textDecoration: 'none' }} to="/">
            <span>All courses / </span>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to={`/courses/${currentPath}`}>
            <span>course / </span>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }}>
            <span>list Assignment</span>
          </NavLink>
        </Box>
      </Box>

      <Box component="div">
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

      <Box sx={{ flexGrow: 1, mt: 5, ml: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">List</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={group}
                label="Group"
                onChange={handleChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>List all student</MenuItem>
                <MenuItem value={20}>Group A</MenuItem>
                <MenuItem value={30}>Group B</MenuItem>
                <MenuItem value={40}>Group C</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button
              style={{ backgroundColor: 'green', height: 40 }}
              startIcon={<AddCircleIcon style={{ color: 'white' }} />}
            >
              <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/course/add-assignment/${course.course_id}`}
              >
                <p style={{ color: 'white' }}>Add New</p>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>

      {assignment.map((assignment) => {
        return (
          <Card
            sx={{ maxWidth: 1060, maxHeight: 175, mt: 2, ml: 3}}
            key={assignment._id}
            style={{ backgroundColor: 'white', border: '1px solid green' , paddingRight: '10px'}}
          >
            <CardContent>
              <Typography color="900 #263238" style={{ marginBottom: 5 }}>
                <b>Assignments</b>
              </Typography>

              <Typography variant="h5" color="900 #263238">
                {assignment._title}
              </Typography>

              <Typography color="900 #263238">
                <b>Assign-date: </b>
                {assignment._assignOn}
              </Typography>

              <Typography color="900 #263238">
                <b>Due-date: </b>
                {assignment._dateline}
              </Typography>
            </CardContent>

            {/* card Button */}
            <CardActions>
              <Button
                variant="outlined"
                style={{
                  border: '1px solid green',
                  color: 'green',
                  height: '45px',
                }}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/course/view-assignment/${assignment._id}`}
                >
                  <p>View Assignment</p>
                </Link>
              </Button>
            </CardActions>
          </Card>
        );
      })}
        <Box
          sx={{
            marginTop: '20px',
            marginBottom: '20px',
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
        <Box>
            <Pagination
              count={10}
              page={page}
              color="primary"
              onChange={handlePageChange}
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '20px',
              }}
            />
          </Box>
      </Box>
    </Box>
  );
}
