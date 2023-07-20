import {
  AspectRatio,
  Box,
  Card,
  CardOverflow,
  Divider,
  Typography,
} from '@mui/joy';
import React from 'react';
import axios from 'axios';
// import { courses } from './Courses';
import { useParams } from 'react-router';
import Navbar from '../navbar/Navbar';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { Link, NavLink } from 'react-router-dom';
import { Tab, TabList, Tabs, tabClasses } from '@mui/joy';
import { useState, useEffect } from 'react';

export default function SingleCourse() {
  // const { id } = useParams();
  // const { image, course_name, creator } = courses[id];
  var [course, setCourse] = useState([]);
  const currentPath = window.location.pathname.substr(16);
  useEffect(() => {
    courses();
  }, []);
  console.log(currentPath);
  const courses = async () => {
    if (localStorage.getItem('role') === 'student') {
      axios
        .post(
          'http://localhost:3000/student/view/course',
          { course_id: currentPath },
          { withCredentials: true }
        )
        .then((result) => {
          setCourse(result.data.results[0]);
        })
        .catch((error) => console.log(error));
    } else if (localStorage.getItem('role') === 'teacher') {
      axios
        .post(
          'http://localhost:3000/teacher/view/course',
          { course_id: currentPath },
          { withCredentials: true }
        )
        .then((result) => {
          setCourse(result.data.results[0]);
          // console.log(result.data.results)
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Box>
      <Navbar />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<BiChevronLeft fontSize="small" />}
      >
        {' '}
        <Link />
        <NavLink style={{ textDecoration: 'none' }} to="/teacher">
          Courses
        </NavLink>
        <Typography fontWeight="bold">Course</Typography>
      </Breadcrumbs>
      <Box>
        <Box mt="20px" ml="20px">
          <Card
            variant="outlined"
            sx={{ width: 320, border: '1px solid black', boxShadow: 3 }}
          >
            <CardOverflow>
              <AspectRatio ratio="1.5">
                <img src={course.coursePhoto} loading="lazy" alt="" />
              </AspectRatio>
            </CardOverflow>
            <Typography
              level="h2"
              sx={{ fontSize: 'md', fontWeight: 'bold', mt: 2, mb: 2 }}
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
                sx={{ fontWeight: 'bold', color: 'text.secondary' }}
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
                      bgcolor: 'primary.400',
                    },
                  },
                }}
              >
                <Tab>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/student/course/session_list/${currentPath}`}
                  >
                    Sessions
                  </Link>
                </Tab>
                <Tab>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/student/course/assignment_list/${currentPath}`}
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
      </Box>
    </Box>
  );
}
