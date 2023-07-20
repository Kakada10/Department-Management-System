import React, { useState } from 'react';
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

const groups = [
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
  { value: 'D', label: 'D' },
];

export default function AddMaterial() {
  const { id } = useParams();
  const [inputGroup, setInputGroup] = useState('');
  const [inputDesc, setInputDesc] = useState('');
  const [inputTitle, setInputTitle] = React.useState('');
  const [inputFile, setInputFile] = React.useState('');
  const [Group, setGroup] = useState([]);
  const animatedComponents = makeAnimated();
  let currentPath = window.location.pathname.substr(29);

  console.log(currentPath);

  const handleUpload = async () => {
    var now = new Date();
    const time = now.getHours() + ':' + now.getMinutes();
    const date =
      now.getDate() + '-' + (now.getMonth() + 1) + '-' + now.getFullYear();
    for (let i = 0; i < Group.length; i++) {
      axios
        .post(
          'http://localhost:3000/teacher/upload/material',
          {
            course_id: currentPath,
            title: inputTitle,
            time: time,
            date: date,
            group: Group[i].value,
            file: inputFile,
            desc: inputDesc,
          },
          { withCredentials: true }
        )
        .catch((error) => console.log(error));
    }
    window.location.replace(`/teacher/course/material/${currentPath}`);
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
        <h2>Add new Material</h2>
      </Box>

      {/* form Submit */}
      <Grid>
        <div style={{ maxWidth: 700, marginLeft: '5%' }}>
          <form onsubmit={handleSubmit}>
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
                    onClick={handleUpload}
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
                  placeholder="Type your message here"
                  variant="outlined"
                  onChange={handleInputDesc}
                  fullWidth
                  required
                />
              </Grid>

              <Grid item xs={4}>
                <SELECT_OPTIONS
                  onChange={handleSelectGroup}
                  placeholder="Group"
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  defaultValue={[groups[20], groups[20]]}
                  isMulti
                  options={groups}
                />
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
