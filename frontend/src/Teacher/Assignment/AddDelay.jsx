import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../navbar/Navbar';
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
import {useState, useEffect} from 'react';
import axios from 'axios';

export default function AddAssignment() {
  const { id } = useParams();
  const [student_id,setStudent_id] = useState('');
  const [inputDueDate,setInputDueDate] = useState('');
  const [inputDueTime,setInputDueTime] = useState('');

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

  const dueDate = inputDueDate.$D +'-'+Number(inputDueDate.$M+1)+'-'+inputDueDate.$y;
  const dueTime = convertToDecimal(inputDueTime.$H) + ':'+ convertToDecimal(inputDueTime.$m);
  const assignment_id = window.location.pathname.substr(26)

  const delay = async () => {
    axios.post("http://localhost:3000/teacher/delay/assignment",{student_id: student_id , assignment_id: assignment_id, newDueDate : dueDate, newDueTime: dueTime},{ withCredentials: true })
      .then((result) => {
        alert("Delay Successfully!")
        window.location.replace("/teacher/course/delay/"+id)
        })
      .catch(error => console.log(error));
    }

  const handleInputId = async (e) => {
    setStudent_id(e.target.value)
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const Navigate = useNavigate();

  const handleClick = () => {
    Navigate(`/teacher/course/delay/${id}`);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Add Delay</h2>
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
                    onClick={delay}
                    variant="contained"
                    color="success"
                  >
                    Assign
                  </Button>
                </Stack>
              </Grid>

              {/* field student id */}
              <Grid item xs={12} style={{ marginBottom: '1%' }}>
                <TextField
                  type="text"
                  placeholder="Enter Student ID"
                  label="Student ID"
                  variant="outlined"
                  onChange={handleInputId}
                  fullWidth
                  required
                />
              </Grid>

              {/* date and time picker sx={{ ml: 5, maxWidth: '50%' }} */}
              <Grid item xs={12}>
                <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker']}>
                      <DemoItem label="New Due Date *">
                        <DatePicker value={inputDueDate}  onChange={(newValue) => setInputDueDate(newValue)}/>
                      </DemoItem>
                      <DemoItem label="New Time Due *">
                        <MobileTimePicker
                          value={inputDueTime}  onChange={(newValue) => setInputDueTime(newValue)}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>

                {/* <div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['MobileTimePicker']}>
                      <DemoItem label="Time Due *">
                        <MobileTimePicker
                          defaultValue={dayjs('2022-04-17T15:30')}
                        />
                      </DemoItem>
                    </DemoContainer>
                  </LocalizationProvider>
                </div> */}
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </>
  );
}
