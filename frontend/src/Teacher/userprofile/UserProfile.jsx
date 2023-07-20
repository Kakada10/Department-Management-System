import { Avatar, Button, Grid, Paper, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../../assets/ITC.png';

import Navbar from '../navbar/Navbar';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router';
import Stack from '@mui/material/Stack';






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


function UserProfile() {
  const classes = useStyles();
  const { id } = useParams();


  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>View Profile</h2>
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
              <Grid item>
                <Typography variant="h4">
                  Institute of Technology of Cambodia
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  <p style={{ fontWeight: 'bold' }}>ID: e20201873</p>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  <p style={{ fontWeight: 'bold' }}>Email: ITC.edu.com.kh</p>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  <p style={{ fontWeight: 'bold' }}>Address: 28.30, 566</p>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6" color="textSecondary">
                  <p style={{ fontWeight: 'bold' }}>Tel: 011 508 187</p>
                </Typography>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button
                    style={{ height: '50px' }}
                    variant="outlined"
                    color="error"
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'white' }}
                      to={`/teacher`}
                    >
                      <p style={{ color: 'Black' }}>Cancel</p>
                    </Link>
                  </Button>

                  <Button
                    style={{ height: '50px' }}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                  >
                    <Link
                      style={{ textDecoration: 'none', color: 'white' }}
                      to={`/teacher/profile/edit/`}
                    >
                      <p style={{ color: 'white' }}>Edit Profile</p>
                    </Link>
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

export default UserProfile;

