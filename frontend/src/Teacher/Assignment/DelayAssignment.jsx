
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
import axios from 'axios';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Button from '@mui/material/Button';
import {useState,useEffect} from 'react';

export const DelayAssignment = () => {
  const { id } = useParams();
  const assignment_id = window.location.pathname.substr(22);
  const [data,setData] = useState([])
  let i = 1;
  useEffect(() => {
    DelayList();
  },[])

  const DelayList = () => {
    axios.get('http://localhost:3000/teacher/delay/assignment/'+assignment_id,{ withCredentials: true })
    .then((result)=>{
      setData(result.data.results)
    })
  }
  console.log(assignment_id)
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
          <Typography fontWeight="bold">Delay Assignment</Typography>
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
            <Box>
              <p>{''}</p>
            </Box>
            <div>
              <Button
                style={{ backgroundColor: 'green', height: 40 }}
                startIcon={<AddCircleIcon style={{ color: 'white' }} />}
              >
                <Link
                  style={{ textDecoration: 'none', color: 'white' }}
                  to={`/teacher/course/delay_add/${id}`}
                >
                  <p style={{ color: 'white' }}>Add New</p>
                </Link>
              </Button>
            </div>
          </Box>
          <div>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Student_id</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>New Due Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{i++}</TableCell>
                    <TableCell>{item.student_id}</TableCell>
                    <TableCell>{item._dueDate}</TableCell>
                    <TableCell>{item.new_due_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </Grid>
    </>
  );
};
