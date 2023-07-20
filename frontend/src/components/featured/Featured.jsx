import { Box, Typography } from '@mui/material';
import image from '../assets/python_1.jpg';

export default function Featured() {
  return (
    <Box
      component="div"
      sx={{ height: '500px', backgroundColor: 'lightgray', display: 'flex' }}
    >
      <Box
        component="div"
        justifyContent="center"
        flexDirection="column"
        display="flex"
        padding="20px"
        width='30%'
        bgcolor='#0277bd'
        color='white'
        
      >
        <Typography variant="h6" alignContent='center'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab non quae aliquam illum ratione at optio voluptates quam.</Typography>
      </Box>
      <Box component="div" height='100%'  mr='-1' width='100%'>
        <img
          alt=""
          width='100%'
          height="100%"
          src="https://images.unsplash.com/photo-1588580000645-4562a6d2c839?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        />
      </Box>
    </Box>
  );
}
