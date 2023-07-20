import { Box } from '@mui/system';
import React, { useState } from 'react';
import { BiCalendarCheck, BiChevronLeft } from 'react-icons/bi';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import BasicSelect from '../tables/Search';
import { Avatar, Typography } from '@mui/material';
import Button from '@mui/material/Button';

import { courses } from '../../variable/constrant';
import { useNavigate } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';
import { Grid } from '@material-ui/core';
import axios from "axios";
import Pagination from '@mui/material/Pagination';


import AddCircleIcon from '@mui/icons-material/AddCircle';

export default function SessionList() {
  const { id } = useParams();
  var [course, setCourse] = useState([]);
  var [session, setSession] = useState([]);
  const [group, setGroup] = React.useState('');
  let currentPath = window.location.pathname.substr(21);
  // console.log(currentPath)

   const [page, setPage] = useState(1);
   const handlePageChange = (event, value) => {
     setPage(value);
   };

   const handleChange = (event) => {
    if(event.target.value==20){
      axios.post("http://localhost:3000/teacher/viewByGroup/session",{course_id: currentPath,group:"A"},{ withCredentials: true })
          .then((result) => {
            setSession(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==30){
      axios.post("http://localhost:3000/teacher/viewByGroup/session",{course_id: currentPath,group:"B"},{ withCredentials: true })
          .then((result) => {
            setSession(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==40){
      axios.post("http://localhost:3000/teacher/viewByGroup/session",{course_id: currentPath,group:"C"},{ withCredentials: true })
          .then((result) => {
            setSession(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==10){
      axios.post("http://localhost:3000/teacher/viewAll/session",{course_id: currentPath},{ withCredentials: true })
          .then((result) => {
            setSession(result.data.results)
            })
          .catch(error => console.log(error));
    }
    setGroup(event.target.value);
  };

  // const { image, course_name, creator } = courses[id];
  const navigate = useNavigate();

  function navigateHandler(id) {
    navigate(`/course/student-list/${id}`);
  }


  useEffect(() => {
    sessions()
    courses();
  }, [])

  const sessions = async () => {
    if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/viewAll/session",{course_id: currentPath},{ withCredentials: true })
        .then((result) => {
          setSession(result.data.results);
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
        // console.log(result.data.results)
        })
      .catch(error => console.log(error));
    }
  };

  return (
    <Box component="div">
      <Navbar />
      <Box component="div" mt="20px" display="flex">
        <BiChevronLeft size="2rem" />
        <Box component="span" fontSize="15px" fontWeight="bold" mt="5px">
          <NavLink style={{ textDecoration: 'none' }} to="/">
            <span>All courses / </span>
          </NavLink>
          <NavLink style={{ textDecoration: 'none' }} to={`/courses/${course.course_id}`}>
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
          <img height="100%" width="100%" src="https://image.shutterstock.com/image-photo/tiny-floating-house-on-lake-600w-1980476267.jpg" />
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

    <Box sx={{ flexGrow: 1, mt:5, ml:3 }}>
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
                to={`/course/add-session/${id}`}
              >
                <p style={{ color: 'white' }}>Add New</p>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Box>

      {session.map((session) => {
        return (
          // card
          <Card sx={{ maxWidth: 1060, maxHeight: 175, mt: 2, ml:3 }} 
          key={session.id}
          style={{backgroundColor: "#e1f5fe"}}
          >
            {/* <CardHeader
              title="Sessions"
              // subheader="September 14, 2016"
            /> */}
            {/* card Header */}
            <CardContent>
            <Typography
             color="900 #263238"
             style={{ marginBottom: 5,}}
             >
                <b>Sessions</b>
              </Typography>

              <Typography variant="h5" color="900 #263238">
                {session._name}
              </Typography>

              <Typography color="600 #263238">
                {session._start} <span>- </span>{session._end}
              </Typography>

              <Typography color="600 #263238">
                <span>Date : </span>{session._date}
              </Typography>

            </CardContent>

            {/* card Button */}
            <CardActions>
              <Button variant="outlined">See more</Button>
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
<Pagination count={10} page={page} color='primary' onChange={handlePageChange} />
      </Box>
    </Box>
  );
}
