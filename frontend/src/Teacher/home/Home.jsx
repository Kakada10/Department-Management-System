import { Box } from '@mui/material';
import React from 'react';
import CoursesList from '../courses/CoursesList';
import Featured from '../featured/Featured';
// import Navbar from '../Teacher/navbar/Navbar';
import Navbar from "../navbar/Navbar"
// import Footer from "../footer/Footer"

export default function Home() {
  return (
    <Box>
      <Box style={{ background: '#E6F0FF' }}>
        <Navbar />
        {/* <Featured /> */}
        {/* <Footer/> */}
      </Box>
      <CoursesList />
    </Box>
  );
}
