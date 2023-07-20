import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Link from '@mui/joy/Link';
import { Button, Grid, Typography } from '@mui/joy';
import { useState, useEffect } from 'react';
// import { courses } from './Courses';
import { useNavigate } from 'react-router';
import axios from 'axios';
export default function Course() {
  var [course, setCourse] = useState([]);
  const navigate = useNavigate();

  function navigateHandler(index) {
    localStorage.setItem('id', index);
    navigate(`/teacher/course/${index}`);
  }

  useEffect(() => {
    courses();
  }, []);

  const courses = async () => {
    if (localStorage.getItem('role') === 'student') {
      axios
        .get('http://localhost:3000/student/logined', { withCredentials: true })
        .then((result) => {
          setCourse(result.data.results);
        })
        .catch((error) => console.log(error));
    } else if (localStorage.getItem('role') === 'teacher') {
      axios
        .get('http://localhost:3000/teacher/logined', { withCredentials: true })
        .then((result) => {
          setCourse(result.data.results);
          // console.log(result.data.results)
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <Box sx={{ backgroundColor: 'white', py: 10 }}>
      <Box sx={{ ml: 30 }}>
        <Typography
          sx={{ color: '#000339', fontSize: '35px', fontWeight: 'bold' }}
        >
          All Course
        </Typography>
        <Typography sx={{ color: '#5A6473', fontSize: '16px', mt: 1 }}>
          Everything you need to know when looking for your loving Major!
        </Typography>
        <Grid container gap={2}>
          {course.map((course, index) => (
            <Box
              sx={{ minHeight: 350, mt: 5 }}
              style={{ background: '#2E3B55' }}
              key={course.course_id}
            >
              <Card
                variant="outlined"
                sx={(theme) => ({
                  width: 300,
                  gridColumn: 'span 2',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  resize: 'horizontal',
                  overflow: 'hidden',
                  gap: 'clamp(0px, (100% - 360px + 32px) * 999, 16px)',
                  transition: 'transform 0.3s, border 0.3s',
                  '&:hover': {
                    borderColor: theme.vars.palette.primary.outlinedHoverBorder,
                    transform: 'translateY(-2px)',
                  },
                  '& > *': {
                    minWidth: 'clamp(0px, (360px - 100%) * 999,100%)',
                  },
                })}
              >
                <AspectRatio
                  variant="soft"
                  sx={{
                    flexGrow: 1,
                    display: 'contents',
                    '--AspectRatio-paddingBottom':
                      'clamp(0px, (100% - 360px) * 999, min(calc(100% / (16 / 9)), 300px))',
                  }}
                >
                  <img
                    src="https://www.classcentral.com/report/wp-content/uploads/2022/06/C-Programming-BCG-Banner.png"
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                    maxWidth: 200,
                  }}
                >
                  <Box sx={{ display: 'flex' }}>
                    <div>
                      <Typography level="h2" sx={{ fontSize: 'md' }} mb={0.5}>
                        <Link
                          href="#container-responsive"
                          overlay
                          underline="none"
                          sx={{
                            color: 'text.primary',
                            '&.Mui-focusVisible:after': {
                              outlineOffset: '-4px',
                            },
                          }}
                        >
                          <Typography fontWeight="bold">
                            {' '}
                            {course.course_name}
                          </Typography>
                        </Link>
                      </Typography>
                      {/* <Typography level="body2">California, USA</Typography> */}
                    </div>
                  </Box>
                  <AspectRatio
                    variant="soft"
                    sx={{
                      '--AspectRatio-paddingBottom':
                        'clamp(0px, (100% - 200px) * 999, 200px)',
                      pointerEvents: 'none',
                    }}
                  >
                    <img alt="" src={course.photoC} />
                  </AspectRatio>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                    <Avatar src="https://images.unsplash.com/photo-1680022683888-052e4f20ebea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" />
                    <div>
                      <Typography fontWeight="bold">Lectured by</Typography>
                      <Typography fontWeight="lg" level="body2">
                        {course.name}
                      </Typography>
                    </div>
                  </Box>
                  <Button
                    onClick={() => navigateHandler(course.course_id)}
                    variant="outlined"
                  >
                    View
                  </Button>
                </Box>
              </Card>
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
