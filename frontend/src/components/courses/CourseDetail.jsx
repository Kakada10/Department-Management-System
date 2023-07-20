import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useParams } from 'react-router';
import { courses } from '../../variable/constrant';

export default function CourseDetail() {
  const { id } = useParams();
  const { image, course_name, creator } = courses[id];
  
  return (
    <Box
      component="div"
      mt="20px"
      ml="10px"
      width="100%"
      height="250px"
      display="flex"
    >
      <Box component="div" height="100%"  width="20%">
        <img height="100%" width="100%" src={image} alt="" />
      </Box>
      <Box component="div" ml="10px">
        <Typography variant="h5">{course_name}</Typography>
        <Typography
          component="span"
          mt="10px"
          fontSize="12.5px"
          fontWeight="500"
          color="rgba(0,0,0,0.6)"
        >
          Lecturer by {creator}
        </Typography>
      </Box>
    </Box>
  );
}