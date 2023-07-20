import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import SELECT_OPTIONS from 'react-select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import axios from 'axios';
import makeAnimated from 'react-select/animated';
import { FormControl } from '@mui/material';

const groups = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

export default function EditMaterial() {
  const { id } = useParams();
  const [inputDesc, setInputDesc] = useState('');
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputFile, setInputFile] = React.useState('');
  const [Group, setGroup] = useState([]);
  let currentPath = window.location.pathname.substr(30);

  //   console.log(currentPath)

  useEffect(() => {
    handleDisplay();
  }, []);

  const handleSubmitEdit = async () => {
    var now = new Date();
    let course_id = localStorage.getItem('course_id');
    const time = now.getHours() + ':' + now.getMinutes();
    const date =
      now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
    axios
      .post(
        'http://localhost:3000/teacher/update/material',
        {
          course_id: course_id,
          id: currentPath,
          title: inputTitle,
          time: time,
          date: date,
          group: Group.value,
          file: inputFile,
          desc: inputDesc,
        },
        { withCredentials: true }
      )
      .catch((error) => console.log(error));
    window.location.replace(`/teacher/course/material/${course_id}`);
  };

  const handleDisplay = async () => {
    let course_id = localStorage.getItem('course_id');
    axios
      .post(
        'http://localhost:3000/teacher/displayOne/material',
        { course_id: course_id, id: id },
        { withCredentials: true }
      )
      .then((result) => {
        // console.log(result.data.results[0])
        setInputTitle(result.data.results[0].title);
        setInputDesc(result.data.results[0]._desc);
        setGroup(result.data.results[0]._group);
        setInputFile(result.data.results[0]._file);
        // window.location.replace(`/course/${course_id}/material/${id}`)
      })
      .catch((error) => console.log(error));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSelectGroup = (e) => {
    setGroup(e);
  };

  const handleInputTitle = async (e) => {
    setInputTitle(e.target.value);
  };

  const handleInputDesc = async (e) => {
    setInputDesc(e.target.value);
  };

  const handleInputFile = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setInputFile(base64);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate(`/teacher/course/material/${id}`);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Edit Material</h2>
      </Box>

      {/* form Submit */}
      <Grid>
        <div style={{ maxWidth: 700, marginLeft: '5%' }}>
          <form onsubmit={handleSubmitEdit}>
            <Grid container spacing={1}>
              {/* Button discard and assign */}
              <Grid item xs={6} style={{ marginLeft: '71%' }}>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={handleClick}
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={handleSubmitEdit}
                    variant="contained"
                    color="success"
                  >
                    Assign
                  </Button>
                </Stack>
              </Grid>

              {/* field title */}
              <Grid item xs={12} style={{ marginBottom: '1%' }}>
                <TextField
                  type="text"
                  placeholder="Enter Title"
                  label="Title"
                  variant="outlined"
                  value={inputTitle}
                  onChange={handleInputTitle}
                  fullWidth
                  required
                />
              </Grid>

              {/* Field Description */}
              <Grid item xs={12}>
                <TextField
                  label="Description"
                  multiline
                  rows={4}
                  value={inputDesc}
                  placeholder="Type your message here"
                  variant="outlined"
                  onChange={handleInputDesc}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <SELECT_OPTIONS
                  variant="outlined"
                  color="neutral"
                  placeholder="Select group"
                  onChange={handleSelectGroup}
                  value={[{ label: Group[0], value: Group[0] }]}
                  options={groups}
                ></SELECT_OPTIONS>
              </Grid>
              {/* file upload */}
            </Grid>
            <div>
              <Grid sx={{ mt: 10 }}>
                <input
                  style={{
                    marginTop: '20px',
                    marginBottom: '20px',
                    marginLeft: '3px',
                  }}
                  type="file"
                  onChange={handleInputFile}
                />
              </Grid>
            </div>
          </form>
        </div>
      </Grid>
    </>
  );
}
