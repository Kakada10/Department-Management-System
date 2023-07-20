import React from 'react';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Navbar from '../navbar/Navbar';
import TableBody from '@mui/material/TableBody';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from 'react';
import axios from "axios";
export const ToGrade = () => {
  const { id } = useParams();
  const [student,setStudent] = useState([])
  
  useEffect(() => {
    students();
  }, [])
  const students = async () => {
    axios.get("http://localhost:3000/teacher/getStudent/assignment/"+id,{ withCredentials: true })
      .then((result) => {
        setStudent(result.data.results);
        })
      .catch(error => console.log(error));
  }

  function handleClick (student_id) {
    localStorage.setItem("Student_id",student_id);
  }

  return (
    <>
      <Navbar />

      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>View Assignment</h2>
      </Box>

      <Box sx={{ marginLeft: '3%' }}>
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
          <Typography fontWeight="bold">To Grade</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ width: '30%', marginLeft: '3%' }}>
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
                to={`/teacher/course/view_assignmentdetail/${id}`}
              >
                View Detail
              </Link>
            </Tab>
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
                to={`/teacher/course/tograde/${id}`}
              >
                To Grade
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/graded/${id}`}
              >
                Graded
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none', color: 'black' }}
                to={`/teacher/course/delay/${id}`}
              >
                Delay
              </Link>
            </Tab>
          </TabList>
        </Tabs>
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>status</TableCell>
                <TableCell>Turn In On</TableCell>
                <TableCell>point</TableCell>
                <TableCell>action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.student_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item._status}</TableCell>
                  <TableCell>
                    {item._submitDate} / {item._submitTime}
                  </TableCell>
                  <TableCell>
                    {item.S2}/{item.S1}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={() => handleClick(item.student_id)}
                    >
                      <Link to={`/teacher/course/return_submit/${id}`}>
                        <VisibilityIcon style={{ paddingTop: '3px' }} />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </Grid>
    </>
  );
};

