import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../assets/ITC.png';

import Navbar from '../navbar/Navbar';
import Box from '@mui/material/Box';

import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(4),
    padding: theme.spacing(4),
    [theme.breakpoints.down('sm')]: {
      margin: theme.spacing(2),
      padding: theme.spacing(2),
    },
  },
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  },
  button: {
    marginLeft: theme.spacing(0),
    [theme.breakpoints.down('sm')]: {
      marginLeft: theme.spacing(1),
    },
  },
}));

function EditUserProfile() {
  const classes = useStyles();

  return (
    <>
    <Navbar/>
    <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Edit Profile</h2>
      </Box>
    <Paper className={classes.root} elevation={3}>
      <Grid container spacing={2}>
        <Grid item>
          <Avatar
            className={classes.avatar}
            alt="User's Name"
            // src="/path/to/image.jpg"
            src={logo}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            {/* <Grid item>
              <Typography variant="h4">Institute of Technology of Cambodia</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                <p style={{fontWeight: 'bold',}}>ID: e20201873</p> 
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                 <p style={{fontWeight: 'bold',}}>Email: ITC.edu.com.kh</p>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                 <p style={{fontWeight: 'bold',}}>Address: 28.30, 566</p>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6" color="textSecondary">
                 <p style={{fontWeight: 'bold',}}>Tel: 011 508 187</p>
              </Typography>
            </Grid>  */}
            <Grid item>
              <TextField
                label="ID"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="User Name"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
              />
            </Grid>

            <Grid item>
              <TextField
                label="Tel"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item>
            <Stack direction="row" spacing={2}>
            <Button 
                style={{height: '50px'}}

            variant="outlined" 
            color="error"
            >
        <Link
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/profile`}
              >
                <p style={{ color: 'Black' }}>Cancel</p>
              </Link>
      </Button>
              <Button
                style={{height: '50px'}}

                variant="contained"
                color="primary"
                className={classes.button}
              >
                Submit
              </Button>
              </Stack>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    </>
  );
}

export default EditUserProfile;


// import React from 'react'
// import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
// import logo from '../assets/ITC.png';
// import Navbar from '../navbar/Navbar';



// export default function EditUserProfile() {
//   return (
//     <div>
//         <Navbar/>
//          <h1> EditUserProfile</h1>
//         <Paper elevation={3}>

//     <Grid container spacing={2}>
//   <Grid item>
//   <Avatar src={logo} alt="User's Name" />

//   </Grid>
//   <Grid item xs={12} sm container>
//     <Grid item xs container direction="column" spacing={2}>
//       <Grid item>
//         <Typography variant="h5">User's Name</Typography>
//       </Grid>
//       <Grid item>
//         <Typography variant="body2">User's Email Address</Typography>
//       </Grid>
//       <Grid item>
//         <Button variant="contained" color="primary">Edit Profile</Button>
//       </Grid>
//     </Grid>
//   </Grid>
// </Grid>

// <Grid item>
//   <TextField label="Bio" variant="outlined" fullWidth multiline rows={4} />
// </Grid>
// <Grid item>
//   <TextField label="Location" variant="outlined" fullWidth />
// </Grid>
// <Grid item>
//   <TextField label="Website" variant="outlined" fullWidth />
// </Grid>
// </Paper>
// </div>
//   )
// }
