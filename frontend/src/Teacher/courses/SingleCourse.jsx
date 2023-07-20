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
import { Button } from '@mui/joy';
import { Tab, TabList, Tabs, tabClasses } from '@mui/joy';
import { useState, useEffect } from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
export default function SingleCourse() {
  // const { id } = useParams();
  // const { image, course_name, creator } = courses[id];
  var [course, setCourse] = useState([]);
  const currentPath = window.location.pathname.substr(16);
  useEffect(() => {
    courses();
  }, []);

  const handleEdit = async () => {
    window.location.replace('/teacher/edit/course/' + currentPath);
  };

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
          All Courses
        </NavLink>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/teacher/course/${course.course_id}`}
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
            <AspectRatio ratio="1.5">
              <img height="100%" width="100%" src={course.photoC} alt="" />
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="h2"
            sx={{ fontSize: 'md', fontWeight: 'bold', ml: 2 }}
          >
            {course.course_name}
            <div
              onClick={handleEdit}
              style={{
                position: 'absolute',
                right: '10px',
                top: '240px',
                cursor: 'pointer',
              }}
            >
              <img
                width="40px"
                height="40px"
                src="https://img.freepik.com/premium-vector/edit-text-icon-pencil-icon-sign-up-icon-pen-ballpoint-with-square-box-vector-illustration_399089-2806.jpg?w=2000"
              ></img>
            </div>
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
              sx={{ fontWeight: 'bold', color: 'text.secondary', ml: 2 }}
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
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/teacher/course/student_list/${course.course_id}`}
                >
                  Students
                </Link>
              </Tab>
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/teacher/course/session_list/${course.course_id}`}
                >
                  Sessions
                </Link>
              </Tab>
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/teacher/course/assignment_list/${course.course_id}`}
                >
                  Assignments
                </Link>
              </Tab>
              <Tab>
                <Link
                  style={{ textDecoration: 'none', color: 'black' }}
                  to={`/teacher/course/material/${course.course_id}`}
                >
                  Materials
                </Link>
              </Tab>
            </TabList>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
}
