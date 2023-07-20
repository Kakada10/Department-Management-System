import { Box } from '@mui/system';
import React from 'react';
import { BiChevronLeft } from 'react-icons/bi';
import { useParams } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import { Typography } from '@mui/material';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Listdata } from './Listdata';
import { useEffect } from 'react';
import { courses } from '../variable/constrant';
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MenuItem from '@mui/material/MenuItem';

import Pagination from '@mui/material/Pagination';

import { useState } from 'react';
import { CardOverflow } from '@mui/joy';

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { Tab, TabList, Tabs, tabClasses } from '@mui/joy';

import { AspectRatio, Divider } from '@mui/joy';

import { TextField } from '@mui/material';

import Grid from '@mui/material/Grid';

export default function AssignmentList() {
  const { id } = useParams();
  // const { image, course_name, creator } = courses[id];

  // pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  let currentPath = window.location.pathname.substr(25);
  localStorage.setItem('course_id', currentPath);
  const [course, setCourse] = useState([]);
  const [material, setMaterial] = useState([]);
  // console.log(currentPath)
  useEffect(() => {
    courses();
    materials();
  }, []);

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
          // console.log(result.data.results[0])
          setCourse(result.data.results[0]);
        })
        .catch((error) => console.log(error));
    }
  };

  const materials = async () => {
    axios
      .get('http://localhost:3000/student/displayAll/material/' + currentPath, {
        withCredentials: true,
      })
      .then((result) => {
        // console.log(result.data.results)
        setMaterial(result.data.results);
      })
      .catch((error) => console.log(error));
  };

  const [student, setStudent] = React.useState('');

  const handleChange = (event) => {
    setStudent(event.target.value);
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
              sx={{ fontSize: 'md', fontWeight: 'bold', mt: 2, mb: 2, ml: 2 }}
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
                level="body4"
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

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        width="90%"
        mt="20px"
      >
        <Card style={{ width: '90%' }}>
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
          >
            {/* <Box>
              <TextField
                label="Group"
                select
                value={student}
                onChange={handleChange}
                style={{ minWidth: 200 }}
                size="small"
              >
                <MenuItem value="Al">All</MenuItem>
                <MenuItem value="GA">Group A</MenuItem>
                <MenuItem value="GB">Group B</MenuItem>
                <MenuItem value="GC">Group C</MenuItem>
              </TextField>
            </Box> */}
            {/* <div>
              <Button
                style={{ backgroundColor: 'green', height: 40 }}
                startIcon={<AddCircleIcon style={{ color: 'white' }} />}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/teacher/course/add_material/${currentPath}/${id}`}
                >
                  <p style={{ color: 'white' }}>Add New</p>
                </Link>
              </Button>
            </div> */}
          </Box>

          {material.map((Data) => {
            return (
              <Card
                sx={{
                  maxWidth: 1160,
                  maxHeight: 175,
                  mt: 2,
                  ml: 3,
                  boxShadow: 3,
                }}
                key={Data.id}
                style={{ backgroundColor: 'white', border: '1px solid black' }}
              >
                <CardContent>
                  <Typography color="900 #263238" style={{ marginBottom: 5 }}>
                    <b>Course Material</b>
                  </Typography>

                  <Typography
                    level="body3"
                    sx={{
                      position: 'absolute',
                      fontSize: '14px',
                      color: 'text.secondary',
                      ml: '70%',
                    }}
                  >
                    {' '}
                    Group: <span></span>
                    {Data._group}
                  </Typography>

                  <Typography variant="h5" color="900 #263238">
                    {Data.title}
                  </Typography>

                  <Typography
                    style={{
                      fontSize: '14px',
                      marginLeft: '3px',
                      marginTop: '3px',
                    }}
                    color="900 #263238"
                  >
                    <span>Upload At: </span>
                    {Data.date} {Data.time}
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
                      to={`/student/course/view_material/${Data.id}`}
                    >
                      <p>View Material</p>
                    </Link>
                  </Button>
                </CardActions>
              </Card>
            );
          })}
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
                marginRight: '20px',
              }}
            />
          </Box>
        </Card>
      </Grid>
    </Box>
  );
}
