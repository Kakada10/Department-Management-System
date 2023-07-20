import { Box, Typography } from '@mui/material';
import React from 'react';
import Course from './Course';

export default function CoursesList() {
  return (
    <Box>
      {/* <Typography variant="h3" margin='40px 0 40px' textAlign='center'>Course</Typography> */}
      <Course/>
    </Box>
  );
}
