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

import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Grid, Card, CardContent, Typography } from '@material-ui/core';
import { useParams } from 'react-router';

export default function AddMaterial() {
  const { id } = useParams();

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
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
        <h2>Add new Assignment</h2>
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
                    onClick={onsubmit}
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
                  fullWidth
                  required
                />
              </Grid>

              {/* file upload */}
              <Grid sx={{ mt: 10 }}>
                <FileUpload />
              </Grid>
            </Grid>
          </form>
        </div>
      </Grid>
    </>
  );
}
