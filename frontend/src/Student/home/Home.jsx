import { Box } from '@mui/material';
import React from 'react';
import CoursesList from '../courses/CoursesList';
// import Featured from '../featured/Featured';
import Navbar from '../navbar/Navbar';

export default function Home() {
  return (
    <Box>
      <Box style={{ background: '#E6F0FF' }}>
        <Navbar />
        {/* <Featured /> */}
      </Box>
      <CoursesList />
    </Box>
  );
}
