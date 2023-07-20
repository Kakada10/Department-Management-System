import { Box } from '@mui/system';
import { AspectRatio, Divider, Typography } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { Tab, TabList, Tabs, tabClasses } from '@mui/joy';
import axios from "axios";
// import { courses } from '../variable/constrant';

import Card from '@mui/material/Card';

import MenuItem from '@mui/material/MenuItem';

import ModalDialog from '@mui/joy/ModalDialog';
import { CardOverflow } from '@mui/joy';

import Pagination from '@mui/material/Pagination';

import { TextField } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CardActions from '@mui/material/CardActions';

export default function SessionList() {
  const { id } = useParams();
  // const { image, course_name, creator } = courses[id];

  useEffect(() => {
    Sessions();
    courses();
  }, [])
  
  // pagination
  var [course, setCourse] = useState([]);
  var [session, setSession] = useState([]);
  const [group, setGroup] = React.useState('');
  let currentPath = window.location.pathname.substr(29);
  console.log(currentPath)
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  // const [student, setStudent] = React.useState('');

  const Sessions = async () => {
    if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/viewAll/session",{course_id: currentPath},{ withCredentials: true })
        .then((result) => {
          setSession(result.data.results);
          console.log(result.data.results)
          })
        .catch(error => console.log(error));
    }else if(localStorage.getItem("role")==="student"){
      axios.post("http://localhost:3000/student/viewAll/session",{course_id: currentPath},{ withCredentials: true })
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
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<BiChevronLeft fontSize="small" />}
      >
        {' '}
        <Link />
        <NavLink style={{ textDecoration: 'none' }} to="/student">
          All Courses
        </NavLink>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/student/course/${course.course_id}`}
        >
          Course
        </NavLink>
        <Typography fontWeight="bold">List Session</Typography>
      </Breadcrumbs>
      <Box mt="20px" ml="30px">
        <Card
          variant="outlined"
          sx={{ width: 320, border: '1px solid black', boxShadow: 3 }}
        >
          <CardOverflow>
            <AspectRatio ratio="2">
              <img
                height="100%"
                width="100%"
                src="https://www.classcentral.com/report/wp-content/uploads/2022/06/C-Programming-BCG-Banner.png"
                alt=""
              />
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="h2"
            sx={{ fontSize: 'md', fontWeight: 'bold', ml: 1, mt: 2, mb: 2 }}
          >
            {course.course_name}
          </Typography>

          <Divider />
          <CardOverflow
            variant="soft"
            sx={{
              display: 'flex',
              gap: 1.5,
              py: 1.5,
              px: 'var(--Card-padding)',
              bgcolor: 'background.level1',
            }}
          >
            <Typography
              level="body3"
              sx={{ fontWeight: 'bold', color: 'text.secondary', ml: 1 }}
            >
              Lectured by
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body3"
              sx={{ fontWeight: 'md', color: 'text.secondary' }}
            >
              {course.name}
            </Typography>
          </CardOverflow>
        </Card>
      </Box>
      <Box mt="40px" ml="20px">
        <Box width="30%" mt="5px">
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
              <Tab
                sx={{
                  height: 3,
                  textDecoration: 'underline 2px',
                  textUnderlineOffset: '15px',
                  color: 'primary.400',
                }}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/student/course/session_list/${course.course_id}`}
                >
                  Sessions
                </Link>
              </Tab>
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/student/course/assignment_list/${course.course_id}`}
                >
                  Assignments
                </Link>
              </Tab>
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/student/course/material/${currentPath}`}
                >
                  Materials
                </Link>
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>

      <Card style={{ width: '93%', marginLeft: '2%', padding: '10px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // p: 1,
            // m: 1,
            bgcolor: 'background.paper',
            borderRadius: 1,
            marginLeft: '20px',
            marginTop: '20px',
          }}
        ></Box>

        {session.map((session, i) => (
          <ModalDialog
            aria-labelledby="divider-modal-title"
            aria-describedby="divider-modal-desc"
            sx={{
              // this custom styles is for demonstration purpose, you might not need them in your app
              marginTop: '20px',
              marginLeft: '20px',
              position: 'static',
              transform: 'none',
              maxWidth: 1060,
              boxShadow: 'black',
            }}
            style={{ backgroundColor: 'white', border: '1px solid black' }}
          >
            <Typography fontSize="lg" fontWeight="lg" id="divider-modal-title">
              {session._name}
            </Typography>

            <CardOverflow
              variant="soft"
              sx={{
                display: 'flex',
                gap: 1.5,
                py: 1.5,
                px: 'var(--Card-padding)',
                bgcolor: 'white',
              }}
            >
              <Typography
                level="body3"
                sx={{ fontWeight: 'md', color: 'text.secondary' }}
              >
                {session._start} <span>- </span>
                {session._end}
              </Typography>

              <Divider orientation="vertical" />
              <Typography
                level="body3"
                sx={{ fontWeight: 'md', color: 'text.secondary' }}
              >
                {session._date}
              </Typography>

              <Typography
                level="body3"
                sx={{ fontWeight: 'md', color: 'text.secondary', ml: '78%' }}
              >
                Group : <span> </span>
                {session._group}
              </Typography>
            </CardOverflow>
            <Divider inset="none" />
            <Typography level="body2" id="divider-modal-desc" fontSize="sm">
              {session.description}
            </Typography>
            <Divider />
            <Box
              sx={{
                bgcolor: 'background.level1',
                px: 2,
                py: 1.5,
                m: 'calc(-1 * var(--ModalDialog-padding))',
                mt: 0,
                borderBottomLeftRadius: 'var(--ModalDialog-radius)',
                borderBottomRightRadius: 'var(--ModalDialog-radius)',
              }}
            >
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
                    to={`/student/course/attendance_list/${session.id}`}
                  >
                    <p>View</p>
                  </Link>
                </Button>
              </CardActions>
            </Box>
          </ModalDialog>
        ))}
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
              marginRight: '39%',
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}
