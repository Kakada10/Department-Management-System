import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';

export default function SelectSmall() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
    // console.log(event.target.value)
  };

  return (
    <Box component="div">
      <Box component="flex">
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="demo-select-small">List</InputLabel>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={age}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>List all student</MenuItem>
            <MenuItem value={20}>Group A</MenuItem>
            <MenuItem value={30}>Group B</MenuItem>
            <MenuItem value={40}>Group C</MenuItem>

          </Select>
       
        </FormControl>
      </Box>
     
    </Box>
  );
}
