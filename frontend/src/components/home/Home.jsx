import { Box } from '@mui/material';
import React from 'react';
import CoursesList from '../courses/CoursesList';
import Featured from '../featured/Featured';
import Navbar from '../navbar/Navbar';
// import Footer from "../footer/Footer"

export default function Home() {
  return (
    <Box>
      <Navbar />
      <Featured />
      <CoursesList />
      {/* <Footer/> */}
    </Box>
  );
}
