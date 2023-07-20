import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Navbar from '../navbar/Navbar';
import FileUpload from './FileUpload';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {useState,useEffect} from 'react'
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';
const fileReader = new FileReader();
export default function AddAssignment() {
  const { id } = useParams();

  const [age, setAge] = React.useState('');
  const [assignment,setAssignment] = useState('')
  const handleChange = () => {
    fileReader.readAsTest(inputFile)
  };

  const currentPath = window.location.pathname.substr(32);
  // console.log(currentPath)
  const [inputTitle,setInputTitle] = useState('')
  const [inputDesc,setInputDesc] = useState('')
  const [inputScore,setInputScore] = useState('')
  const [inputEndTime,setInputEndTime] = useState('')
  const [inputDueDate,setInputDueDate] = useState('')
  const [inputEndDate,setInputEndDate] = useState('')
  const [inputDueTime,setInputDueTime] = useState('')
  const [inputFile,setInputFile] = useState('')
  const [inputGroup,setInputGroup] = useState('')
  const [ID,setInputID] = useState('')
  useEffect(() => {
    assignments();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const Navigate = useNavigate();
  
  const handleInputTitle = (e) => {
    setInputTitle(e.target.value)
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

  const handleInputScore = (e) => {
    setInputScore(e.target.value)
  }

  const handleInputDesc = (e) => {
    setInputDesc(e.target.value)
  }

  const handleInputEndDate = (e) => {
    setInputEndDate(e.target.value)
  }

  const handleInputEndTime = (e) => {
    setInputEndTime(e.target.value)
  }

  const handleInputGroup = (e) => {
    setInputGroup(e.target.value)
  }


  const handleInputDueDate = (e) => {
    setInputDueDate(e.target.value)
  }
  const handleInputDueTime = (e) => {
    setInputDueTime(e.target.value)
  }

  const handleInputFile = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setInputFile(base64)
  }

  const assignments = async () => {
    if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/viewDetail/assignment",{assignment_id: currentPath},{ withCredentials: true })
        .then((result) => {
          setInputTitle(result.data.results[0]._title)
          setInputDesc(result.data.results[0]._desc)
          setInputDueDate(result.data.results[0]._dueDate)
          setInputEndDate(result.data.results[0]._endDate)
          setInputGroup(result.data.results[0]._group)
          setInputDueTime(result.data.results[0]._dueTime)
          setInputEndTime(result.data.results[0]._endTime)
          setInputScore(result.data.results[0]._score)
          setInputFile(result.data.results[0]._file)
          setInputID(currentPath)
          })
        .catch(error => console.log(error));
    }
  }

  const onUpdate = () => {
    if(localStorage.getItem("role")==="teacher"){
        console.log(inputScore)
        console.log(inputFile)
        axios.post("http://localhost:3000/teacher/update/assignment",{
          assignment_id: ID, 
          title: inputTitle,
          desc: inputDesc,
          dueDate: inputDueDate,
          endDate: inputEndDate,
          endTime: inputEndTime,
          endDate: inputEndDate,
          group:inputGroup,
          score: inputScore,
          file: inputFile,
      },{ withCredentials: true })
    }
    window.location.replace(`/teacher/course/view_assignment/${id}`);
  }

  const handleClick = () => {
    Navigate(`/teacher/course/view_assignment/${id}`);
  };
  return (
    <>
      <Navbar />
      <Box
        sx={{
          ml: 5,
        }}
      >
        <h2>Update Assignment</h2>
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
                    onClick={onUpdate}
                    variant="contained"
                    color="success"
                  >
                    Update
                  </Button>
                </Stack>
              </Grid>

              {/* field title */}
              <Grid item xs={12} style={{ marginBottom: '1%' }}>
              <InputLabel id="demo-select-small">Title</InputLabel>
                <TextField
                  value={inputTitle}
                  onChange={handleInputTitle}
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              {/* Field Description */}
              <InputLabel id="demo-select-small">Description</InputLabel>
              <Grid item xs={12}>
                <TextField
                  multiline
                  rows={4}
                  value={inputDesc}
                  onChange={handleInputDesc}
                  variant="outlined"
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
                item
                xs={12}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off"
              >
                <div>
                <InputLabel id="demo-select-small">Score</InputLabel>
                  <TextField
                    required
                    id="outlined-required"
                    value={inputScore}
                    onChange={handleInputScore}
                  />
                </div>
              </Grid>
              
              {/* Student who can see this assign */}
              <Grid 
                item
                xs={12}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off">
                <InputLabel id="demo-select-small">Group</InputLabel>
                <TextField
                    value={inputGroup}
                    onChange={handleInputGroup}
                    variant="outlined"
                  />
              </Grid>

            
          {/* date and time picker sx={{ ml: 5, maxWidth: '50%' }} */}
            <Grid item
                xs={3}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off" >
              <InputLabel id="demo-select-small">End Date</InputLabel>
              <TextField
                  value={inputEndDate}
                  onChange={handleInputEndDate}
                  variant="outlined"
                  fullWidth
                />
            </Grid>
            <Grid item
                xs={3}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off" >
              <InputLabel id="demo-select-small">End Time</InputLabel>
              <TextField
                  value={inputEndTime}
                  onChange={handleInputEndTime}
                  variant="outlined"
                  fullWidth
                />
            </Grid>
            <Grid item
                xs={3}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off" >
              <InputLabel id="demo-select-small">Due Date</InputLabel>
              <TextField
                  value={inputDueDate}
                  onChange={handleInputDueDate}
                  variant="outlined"
                  fullWidth
                />
            </Grid>
            <Grid item
                xs={3}
                component="form"
                style={{ marginBottom: '2%' }}
                sx={{
                  '& .MuiTextField-root': { m: 1, ml: 5, width: '20%' },
                }}
                noValidate
                autoComplete="off" >
              <InputLabel id="demo-select-small">Due Time</InputLabel>
             <TextField
                  value={inputDueTime}
                  onChange={handleInputDueTime}
                  variant="outlined"
                  fullWidth
                />
            </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </>
  );
}