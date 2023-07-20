import { Box, Button, styled, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import heroImg from '../../assets/GIC1.png';
import CustomButton from './CustomButton';
import { useTheme } from '@mui/material/styles';
import {
  Facebook,
  Twitter,
  Instagram,
  GitHub,
  Mail,
} from '@mui/icons-material';
import { Link, IconButton, TextField } from '@mui/material';
import WebDev from '../../assets/development.jpg';
import Artificial from '../../assets/AI.jpg';
import Network from '../../assets/Network.jpg';
import CardActions from '@mui/material/CardActions';


const CustomBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(5),
  marginTop: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '64px',
  color: '#000336',
  fontWeight: 'bold',
  margin: theme.spacing(4, 0, 4, 0),
  [theme.breakpoints.down('sm')]: {
    fontSize: '40px',
  },
}));
const Header = () => {
  
  const theme = useTheme();

  return (
    <Box sx={{ backgroundColor: '#E6F0FF', minHeight: '80vh' }}>
      <Box>
      <Container>
        {/* <Navbar /> */}
        <CustomBox>
          <Box sx={{ flex: '1' }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: '18px',
                color: '#687690',
                fontWeight: '500',
                mt: 10,
                mb: 4,
              }}
            >
              Welcome to Institute of Teachnology of Cambodia
            </Typography>
            <Title variant="h1">
              Discover a place where you'll love to study.
            </Title>
            <Typography
              variant="body2"
              sx={{ fontSize: '18px', color: '#5A6473', my: 4 }}
            >
              Be the first to get the best knowledge before they hit the mass
              market! Hot foreclosure deals with one simple search!
            </Typography>
            <NavLink to="/Signin">
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Sign In"
                heroBtn={true}
              />
            </NavLink>
          </Box>

          <Box sx={{ flex: '1.25' }}>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: '100%' }}
            >
              <img
                src={heroImg}
                alt="heroImg"
                style={{
                  width: '75%',
                  height: '100%',
                }}
              />
            </Grid>
          </Box>
        </CustomBox>
      </Container>
      </Box>

{/* body  */}
      <Box sx={{ backgroundColor: 'white', py: 10 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography
            sx={{ color: '#000339', fontSize: '35px', fontWeight: 'bold' }}
          >
            About Us
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            '@media screen and (max-width: 600px)': {
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <Typography
            sx={{
              color: '#5A6473',
              fontSize: '16px',
              mt: 1,
              px: 20,
              '@media screen and (max-width: 600px)': {
                fontSize: '14px',
                px: 10,
              },
            }}
          >
            Everything you need to know when looking for your loving Major!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ad
            consectetur et aperiam rerum aut? Reiciendis, necessitatibus dicta?
            Ratione cum delectus distinctio aliquid eveniet sit cupiditate quis
            minus vitae adipisci? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Eligendi omnis possimus sed voluptas, odio eum cum
            reiciendis voluptates, illo minus iure, debitis inventore
            consequatur dolores harum neque sequi praesentium totam. Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Repellendus ipsam
            consectetur ipsa voluptatibus veniam quod, tempore optio fugit iure!
            Illo mollitia tempora dignissimos maxime pariatur distinctio
            voluptate voluptatum officiis quod?
          </Typography>
        </Box>

        <Grid
          container
          spacing={1}
          sx={{ justifyContent: 'center', marginTop: '2rem' }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={WebDev}
                  alt="Web Development"
                />
                <CardContent>
                  <Typography variant="h6">Web Development</Typography>
                  <Typography variant="body2">
                    Learn the fundamentals of web development and build the best
                    websites.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={Artificial}
                  alt="Artificial Intelligence"
                />
                <CardContent>
                  <Typography variant="h6">Artificial Intelligence</Typography>
                  <Typography variant="body2">
                    Explore the fascinating world of artificial intelligence and
                    its applications.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ maxWidth: 300 }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={Network}
                  alt="Network"
                />
                <CardContent>
                  <Typography variant="h6">Network Administration</Typography>
                  <Typography variant="body2">
                    Gain expertise in network administration and network
                    security courses.
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: '#F8F8F8',
          py: 4,
          px: 3,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h6" color="textPrimary" mr={2}>
            Connect with Us:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: '1rem',
            }}
          >
            <IconButton color="primary" component={Link} href="#">
              <Facebook />
            </IconButton>
            <IconButton color="primary" component={Link} href="#">
              <Twitter />
            </IconButton>
            <IconButton color="primary" component={Link} href="#">
              <Instagram />
            </IconButton>
            <IconButton color="primary" component={Link} href="#">
              <GitHub />
            </IconButton>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary" mr={2}>
            <Link href="/about">About</Link> |{' '}
            <Link href="/contact">Contact</Link> |{' '}
            <Link href="/privacy">Privacy Policy</Link>
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="body2" color="textSecondary" mr={2}>
            Subscribe to our newsletter for updates:
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              label="Email"
              variant="outlined"
              size="small"
              // Add onChange and value props to handle form submission
            />
            <Button variant="contained" color="primary" sx={{ ml: 2 }}>
              Subscribe
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            backgroundColor: '#F8F8F8',
            py: 4,
            px: 3,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Box
            component="footer"
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} Your Website Name. All rights
              reserved.
            </Typography>

            <IconButton
              color="primary"
              component={Link}
              href="mailto:contact@example.com"
            >
              <Mail />
            </IconButton>
          </Box>
        </Box>
            </Box>
    </Box>
  );
};

export default Header;
