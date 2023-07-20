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
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import axios from "axios";

export const Graded = () => {
  const { id } = useParams();
  const [student,setStudent] = useState([])
  useEffect(() => {
    students();
  }, [])

  const students = async () => {
    axios.get("http://localhost:3000/teacher/return/assignment/"+id,{ withCredentials: true })
      .then((result) => {
        setStudent(result.data.results);
        })
      .catch(error => console.log(error));
  }

  // const data = [
  //   {
  //     id: 1,
  //     name: 'John Doe',
  //     status: 'Return',
  //     feedBack: '',
  //     point: '100',
  //   },
  //   {
  //     id: 2,
  //     name: 'Jane Smith',
  //     status: 'Return',
  //     feedBack: '',
  //     point: '100',
  //   },
  //   {
  //     id: 3,
  //     name: 'Bob Johnson',
  //     status: 'Return',
  //     feedBack: '',
  //     point: '100',
  //   },
  // ];

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
          <Typography fontWeight="bold">Graded</Typography>
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
                style={{ textDecoration: 'none' }}
                to={`/teacher/course/view_assignmentdetail/${id}`}
              >
                View Detail
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none' }}
                to={`/teacher/course/tograde/${id}`}
              >
                To Grade
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
                style={{ textDecoration: 'none' }}
                to={`/teacher/course/graded/${id}`}
              >
                Graded
              </Link>
            </Tab>
            <Tab>
              <Link
                style={{ textDecoration: 'none' }}
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
        width="95%"
        mt="20px"
        ml="30px"
      >
        <Card style={{ width: '95%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>status</TableCell>
                <TableCell>feedBack</TableCell>
                <TableCell>Submit On</TableCell>
                <TableCell>Return On</TableCell>
                <TableCell>point</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {student.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.student_id}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>Return</TableCell>
                  <TableCell>{item._feedback}</TableCell>
                  <TableCell>
                    {item._submitDate} / {item._submitTime}
                  </TableCell>
                  <TableCell>
                    {item._returnDate}/{item._returnTime}
                  </TableCell>
                  <TableCell>
                    {item.S2}/{item.S1}
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
