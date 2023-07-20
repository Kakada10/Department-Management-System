import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../navbar/Navbar';
import { Typography, Grid, Paper } from '@material-ui/core';
import Box from '@mui/material/Box';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';
import Tab, { tabClasses } from '@mui/joy/Tab';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import axios from "axios";
import { useEffect, useState } from 'react';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

  const ViewDetailForm = () => {

  useEffect(() => {
    assignments();
  }, [])

  const classes = useStyles();
  const { id } = useParams();
  const [title,setTitle] = useState('');
  const [desc,setDesc] = useState('');
  const [courseID, setCourseID] = useState('');
  const [assignOn, setAssignOn] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [dueTime,setDueTime] = useState('');
  const [endDate,setEndDate] = useState('');
  const [endTime, setEndTime] = useState('');
  const [group, setGroup] = useState('');
  const [score,setScore] = useState('');

  const assignments = async () => {
    axios.post("http://localhost:3000/teacher/viewDetail/assignment",{assignment_id: id},{ withCredentials: true })
      .then((result) => {
        setTitle(result.data.results[0]._title);
        setDesc(result.data.results[0]._desc);
        setCourseID(result.data.results[0]._course_id);
        setAssignOn(result.data.results[0]._assignOn);
        setDueDate(result.data.results[0]._dueDate);
        setDueTime(result.data.results[0]._dueTime);
        setEndDate(result.data.results[0]._endDate);
        setEndTime(result.data.results[0]._endTime);
        setGroup(result.data.results[0]._group);
        setScore(result.data.results[0]._score)
        })
      .catch(error => console.log(error));
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
          <Typography style={{ fontWeight: "bold"}}>Assignment Detail</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ width: '30%', marginLeft: '3%' }}>
        <Tabs aria-label="tabs" defaultValue={0}>
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
            <Tab>
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

      <div className={classes.root}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              {/* <Typography style={{}} variant="h5" gutterBottom>
                Assignment
              </Typography> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Title:
                  </Typography>
                  <Typography variant="body1">{title}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Description:
                  </Typography>
                  <Typography variant="body1">
                    {desc}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Full Score:
                  </Typography>
                  <Typography variant="body1">{score}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Time Due:
                  </Typography>
                  <Typography variant="body1">{dueTime}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Start Date:
                  </Typography>
                  <Typography variant="body1">{assignOn}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    Due Date:
                  </Typography>
                  <Typography variant="body1">{dueDate}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography
                    style={{ fontWeight: 'bold' }}
                    variant="subtitle1"
                  >
                    End Date:
                  </Typography>
                  <Typography variant="body1">{endDate}</Typography>
                </Grid>

                {/* Add more fields as needed */}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default ViewDetailForm;
