import React from 'react';
import Navbar from '../navbar/Navbar';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { BiChevronLeft } from 'react-icons/bi';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

export const ViewMaterialStudent = () => {
  const { id } = useParams();
  let currentPath = window.location.pathname.substr(30);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const [material, setMaterial] = useState([]);

  useEffect(() => {
    materials();
  }, []);

  const materials = async () => {
    let course_id = localStorage.getItem('course_id');
    axios
      .post(
        'http://localhost:3000/teacher/displayOne/material',
        { course_id: course_id, id: currentPath },
        { withCredentials: true }
      )
      .then((result) => {
        setMaterial(result.data.results[0]);
        console.log(result.data.results[0]._file);
      })
      .catch((error) => console.log(error));
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>View Course Detail</h2>
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
            to={`/student/course/${id}`}
          >
            Course
          </NavLink>
          <NavLink
            style={{ textDecoration: 'none' }}
            to={`/student/course/material/${id}`}
          >
            Material
          </NavLink>
          <Typography fontWeight="bold">View Course Detail</Typography>
        </Breadcrumbs>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ backgroundRepeat: 'no-repeat', backgroundSize: 'auto' }}
            >
              <iframe
                zoom="0.8"
                width="80%"
                height="700px"
                overflow="hidden"
                scrolling="no"
                frameBorder="none"
                src={material._file}
              ></iframe>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <h2>Title</h2>
              <p>{material.title}</p>
              <Divider />
              <h2>Description</h2>
              <p>{material._desc}</p>
              <Divider />
              <div>
                <h3>Upload At : </h3>
                <span>
                  {material.date} / {material.time}
                </span>
              </div>
              {/* <h2>Point</h2> */}
              {/* <p>100/100</p>  */}
              {/* <Divider /> */}
              {/* <Button variant="contained">Return</Button> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
