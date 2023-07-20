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
import axios from "axios";
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';


export default function AddSession() {
  const { id } = useParams();
  const [inputDate, setInputDate] = React.useState('');
  const [inputText, setInputText] = React.useState('');
  const [inputSelect, setInputSelect] = React.useState('');
  const [inputFromTime, setInputFromTime] = React.useState('');
  const [inputToTime, setInputToTime] = React.useState('');
  const [inputDesc, setInputDesc] = React.useState('');
  const [inputGroup, setInputGroup] = React.useState('');
  let currentPath = window.location.pathname.substr(28);

  const handleChange = (event) => {
    if(event.target.value==10){
      setInputGroup("all");
    }else if(event.target.value==20){
      setInputGroup("A");
    }else if(event.target.value==30){
      setInputGroup("B");
    }else if(event.target.value==40){
      setInputGroup("C");
    }
    setInputSelect(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  }


  const handleInputDesc = async (e) => {
    setInputDesc(e.target.value)
  }

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

  const handleInputText = async (e) => {
    setInputText(e.target.value)
  }

  const onSubmit = async () =>{
    const date = inputDate.$D +'-'+Number(inputDate.$M+1)+'-'+inputDate.$y;
    const fromTime = convertToDecimal(inputFromTime.$H) + ':'+ convertToDecimal(inputFromTime.$m);
    const toTime = convertToDecimal(inputToTime.$H) + ':'+ convertToDecimal(inputToTime.$m);
    axios.post("http://localhost:3000/teacher/create/session",{name: inputText,desc: inputDesc, course_id: currentPath, start: fromTime, end:toTime , date: date, group: inputGroup},{ withCredentials: true })
      .then((result) => {
        alert("Sessions Created Successfully!!");
        window.location.replace("/teacher/course/session_list/"+currentPath)
        })
      .catch(error => console.log(error));
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
        <h2>Add new Session</h2>
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

              <Grid item xs={12} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileTimePicker']}>
                  <DemoItem label="Scadule *">
                    <DatePicker  id="date" defaultValue={dayjs('17-04-2022')} value={inputDate}  onChange={(newValue) => setInputDate(newValue)}/>
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>

              {/* date and time picker sx={{ ml: 5, maxWidth: '50%' }} */}
            <Grid item xs={12} >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['MobileTimePicker']}>
                <DemoItem label="From Time *">
                    <MobileTimePicker
                      defaultValue={dayjs('18:30')}
                      value={inputFromTime}  onChange={(newValue) => setInputFromTime(newValue)}
                    />
                  </DemoItem>
                  <DemoItem label="To Time *">
                    <MobileTimePicker
                      defaultValue={dayjs('18:30')}
                      value={inputToTime}  onChange={(newValue) => setInputToTime(newValue)}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
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
                    <MenuItem value={50}>Group C</MenuItem>
                  </Select>
                </FormControl>
              </Box>
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

            </Grid>
          </form>
        </div>
      </Grid>
    </>
  );
}