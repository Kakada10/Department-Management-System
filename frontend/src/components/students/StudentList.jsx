import {
  AppBar,
  Toolbar,
  styled,
  alpha,
  InputBase,
  Tooltip,
  Avatar,
  Menu,
  Stack,
} from '@mui/material';
import axios from "axios";
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { BiChevronLeft, BiSearch } from 'react-icons/bi';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Pagination from '../tables/Pagination';
import BasicSelect from '../tables/Search';
import CustomizedInputs from '../tables/Top';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import
 InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';


import { courses } from '../../variable/constrant';
import { useNavigate } from 'react-router-dom';
import { blue } from '@mui/material/colors';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '5px',
  backgroundColor: alpha(theme.palette.primary.light, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.light, 0.25),
  },
  // marginRight: theme.spacing(2),
  // marginLeft: 0,
  // width: '100%',
  // minWidth:'300px',
  // [theme.breakpoints.up('sm')]: {
  //   marginLeft: theme.spacing(3),
  //   width: 'auto',
  // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function StudentList() {
  // console.log(id);
  const navigate = useNavigate();
  var [course, setCourse] = useState([]);
  var [student, setStudent] = useState([]);
  const [group, setGroup] = React.useState('');
  const currentPath = window.location.pathname.substr(21);

    
  useEffect(() => {
    students()
    courses();
  }, [])

  const handleSearch = (search) => {
    // console.log(search)
    axios.post("http://localhost:3000/teacher/search/StudentsInACourse",{course_id: currentPath,search:search},{ withCredentials: true })
    .then((result) => {
      setStudent(result.data.results)
      })
    .catch(error => console.log(error));
  }

  const handleChange = (event) => {
    if(event.target.value==20){
      axios.post("http://localhost:3000/teacher/view/searchStudentsInACourse",{course_id: currentPath,group:"A"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==30){
      axios.post("http://localhost:3000/teacher/view/searchStudentsInACourse",{course_id: currentPath,group:"B"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==40){
      axios.post("http://localhost:3000/teacher/view/searchStudentsInACourse",{course_id: currentPath,group:"C"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==10){
      axios.post("http://localhost:3000/teacher/view/studentsInACourse",{course_id: currentPath},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }
    setGroup(event.target.value);
  };

  const students = async () => {
      if(localStorage.getItem("role")==="teacher"){
        axios.post("http://localhost:3000/teacher/view/studentsInACourse",{course_id: currentPath},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
        }
  };

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
          <Grid item xs={6}>
            <FormControl sx={{ minWidth: 200 }} size="small">
              <InputLabel id="demo-select-small">List</InputLabel>
              <Select
                labelId="demo-select-small"
                id="demo-select-small"
                value={group}
                label="group"
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
          <Grid item xs={3}>

        <Search 
          onChange={(event) => {
            handleSearch(event.target.value);
          }}
          sx={{ display: {  md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

          </Grid>
        </Grid>
      </Box>
      <Pagination students={student} />
    </Box>
  );
}
