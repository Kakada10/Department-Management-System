import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../navbar/Navbar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
import axios from "axios";
var Blob = require('blob');
export default function AddAssignment() {
  
  const { id } = useParams();
  const [inputDueTime, setInputDueTime] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [inputSelect, setInputSelect] = React.useState('');
  const [inputScore, setInputScore] = React.useState('');
  const [inputDueDate, setInputDueDate] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const [inputGroup, setInputGroup] = React.useState('');
  const [inputFile, setInputFile] = React.useState('');
  const [course_id,setCourse_id] = React.useState('');
  let currentPath = window.location.pathname.substr(23);

  const convertToDecimal = (value) => {
    let length=1;
    let time = value;
    for(let i=0 ; i<3 ; i++){
      value = value/10
      if(Math.round(value)!=0){
        length++;
      }
    }
    if(length===1){
      time = "0"+ time;
    }
    return time;
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve,reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result)
      }

      fileReader.onerror = (error) => {
        reject(error)
      }
    })
  }

  const handleInputDesc = async (e) => {
    setInputDesc(e.target.value)
  }

  const handleInputText = async (e) => {
    setCourse_id(currentPath)
    console.log(course_id)
    setInputText(e.target.value)
  }

  const handleInputScore = async (e) => {
    setInputScore(e.target.value)
  }

  const handleInputFile = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setInputFile(base64)
  }

  const handleChange = (event) => {
    if(event.target.value==10){
      setInputGroup("all");
    }else if(event.target.value==20){
      setInputGroup("A");
    }else if(event.target.value==30){
      setInputGroup("B");
    }else if(event.target.value==40){
      setInputGroup("C");
    }else if(event.target.value==50){
      setInputGroup("D");
    }
    setInputSelect(event.target.value);
  };
  const onSubmit = () =>{
    var now = new Date();
    const dateline = inputDueDate.$D +'-'+Number(inputDueDate.$M+1)+'-'+inputDueDate.$y;
    const dueTime = convertToDecimal(inputDueTime.$H) + ':'+ convertToDecimal(inputDueTime.$m);
    const assignDate =  now.getDate() + '-' + (now.getMonth() + 1) +'-'+ now.getFullYear();

    axios.post("http://localhost:3000/teacher/create/assignment",{title: inputText,desc: inputDesc, course_id: course_id, assignOn: assignDate, dateline:dateline , dueTime: dueTime, score: inputScore, group: inputGroup, file: inputFile},{ withCredentials: true })
      .then((result) => {
        alert("Assignment Created Successfully!!");
        window.location.replace("/course/List-assignment/"+course_id)
        })
      .catch(error => console.log(error));
    }

  const handleSubmit = async (e) => {
    e.preventDefault();
  }

  const Navigate = useNavigate();

  const handleClick = () =>{
    Navigate(`/courses/${id}`);
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Add new Assignment</h2>
      </Box>

      {/* form Submit */}
      <Grid>
        <div style={{ maxWidth: 700, marginLeft:"5%" }}>
          <form onsubmit={handleSubmit}>
            <Grid container spacing={1}>

              {/* Button discard and assign */}
              <Grid
                item xs={6}
                style={{marginLeft:"71%"}}
              >
                <Stack direction="row" spacing={2}>
                  <Button 
                  variant="outlined" color="error"
                  onClick={handleClick}
                  >
                    Discard
                  </Button>
                  <Button
                    onClick={onSubmit}
                    variant="contained"
                    color="success"
                  >
                    Assign
                  </Button>
                </Stack>
              </Grid>

              {/* field title */}
              <Grid item xs={12} style={{marginBottom:"1%"}}>
                <TextField
                    type="text"
                    placeholder="Enter Title"
                    label="Title"
                    variant="outlined"
                    value={inputText}
                    onChange={handleInputText}
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
                  value={inputDesc}
                  onChange={handleInputDesc}
                  fullWidth
                  required
                />
              </Grid>

                {/* file upload */}
              <Grid sx={{mt:20,}}>
                <input style={{marginTop: '20px', marginBottom: '20px', marginLeft:'3px'}} type="file" onChange={handleInputFile}/>
              </Grid>

           {/* Score */}
            <Grid
              item xs={12}
              component="form"
              style={{marginBottom:"2%"}}
              sx={{
                '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  id="outlined-required"
                  label="Score"
                  defaultValue=""
                  value={inputScore}
                  onChange={handleInputScore}
                  fullWidth
                />
              </div>
            </Grid>

              {/* Student who can see this assign */}
            <Grid item xs={12}>
              <Box sx={{ mb: 1, maxWidth: '20%' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Group *
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={inputSelect}
                    label="Group"
                    onChange={handleChange}
                  >
                    <MenuItem value={10}>All Group</MenuItem>
                    <MenuItem value={20}>Group A</MenuItem>
                    <MenuItem value={30}>Group B</MenuItem>
                    <MenuItem value={40}>Group C</MenuItem>
                    <MenuItem value={50}>Group D</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

          {/* date and time picker sx={{ ml: 5, maxWidth: '50%' }} */}
            <Grid item xs={12} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileTimePicker']}>
                  <DemoItem label="Date Due *">
                    <DatePicker id="date" defaultValue={dayjs('17-04-2022')} value={inputDueDate}  onChange={(newValue) => setInputDueDate(newValue)} />
                  </DemoItem>
                  <DemoItem label="Time Due *">
                    <MobileTimePicker
                      value={inputDueTime}  onChange={(newValue) => setInputDueTime(newValue)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

            </Grid>
          </form>
        </div>
      </Grid>
    </>
  );
}