import * as React from 'react';
import { Box, Tab, TabList, Tabs, tabClasses } from '@mui/joy';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { Input } from '@mui/joy';
import { BiSearch } from 'react-icons/bi';

import PropTypes from 'prop-types';

import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Table from '@mui/joy/Table';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

import { CardOverflow } from '@mui/joy';

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { NavLink } from 'react-router-dom';
import { BiChevronLeft } from 'react-icons/bi';
import Card from '@mui/material/Card';
import Navbar from '../navbar/Navbar';
import { courses } from '../variable/constrant';

import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Button } from '@mui/joy';

import VisibilityIcon from '@mui/icons-material/Visibility';

import { AspectRatio, Divider } from '@mui/joy';
import { useState ,useEffect } from 'react';
import axios from "axios";

function labelDisplayedRows({ from, to, count }) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'group_name',
    numeric: true,
    disablePadding: false,
    label: 'Group',
  },
  {
    id: 'attend',
    numeric: false,
    disablePadding: true,
    label: 'Attend Class',
  },
  {
    id: 'Time',
    numeric: false,
    disablePadding: true,
    label: 'Time',
  },
  {
    id: 'action',
    numeric: true,
    disablePadding: false,
    label: 'action',
  },
];

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };
 
  return (
    <thead style={{ backgroundColor: 'tomato' }}>
      <tr>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              style={{ textAlign: 'center' }}
              key={headCell.id}
              aria-sort={
                active
                  ? { asc: 'ascending', desc: 'descending' }[order]
                  : undefined
              }
            >
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && order === 'desc'
                        ? 'rotate(0deg)'
                        : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function CourseDetail() {
  var [student, setStudent] = useState([]);
  const [group, setGroup] = React.useState('');
  const [course_id, setCourse_id] = React.useState('');
  const [teacher, setTeacher] = React.useState('');
  const [course, setCourse] = React.useState('');
  const currentPath = window.location.pathname.substr(32);
  console.log(currentPath)

  useEffect(() => {
    attendance();
  }, [])

  
  const attendance = async () => {
    if(localStorage.getItem("role")==="teacher"){
      axios.post("http://localhost:3000/teacher/view/attendance",{session_id: currentPath},{ withCredentials: true })
        .then((result) => {
          setCourse(result.data.results[0].course_name);
          setTeacher(result.data.results[0].t_name);
          setCourse_id(result.data.results[0].course_id)
          setStudent(result.data.results)
          })
        .catch(error => console.log(error));
      }
  };

  const rows = student;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSearch = (search) => {
    // console.log(search)
    axios.post("http://localhost:3000/teacher/search/attendance",{session_id: currentPath,search:search},{ withCredentials: true })
    .then((result) => {
      setStudent(result.data.results)
      })
    .catch(error => console.log(error));
  }
  
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event, newValue) => {
    setRowsPerPage(parseInt(newValue.toString(), 10));
    setPage(0);
  };

  const getLabelDisplayedRowsTo = () => {
    if (rows.length === -1) {
      return (page + 1) * rowsPerPage;
    }
    return rowsPerPage === -1
      ? rows.length
      : Math.min(rows.length, (page + 1) * rowsPerPage);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.

  // const [student, setStudent] = React.useState('');

  // const handleChange = (event) => {
  //   setStudent(event.target.value);
  // };
  const handleChange = (event) => {
    if(event.target.value==20){
      axios.post("http://localhost:3000/teacher/viewByGroup/attendance",{session_id: currentPath,group:"A"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==30){
      axios.post("http://localhost:3000/teacher/viewByGroup/attendance",{session_id: currentPath,group:"B"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==40){
      axios.post("http://localhost:3000/teacher/viewByGroup/attendance",{session_id: currentPath,group:"C"},{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }else if(event.target.value==10){
      axios.post("http://localhost:3000/teacher/view/attendance",{session_id: currentPath },{ withCredentials: true })
          .then((result) => {
            setStudent(result.data.results)
            })
          .catch(error => console.log(error));
    }
    setGroup(event.target.value);
  };

  return (
    <Box>
      <Navbar />
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<BiChevronLeft fontSize="small" />}
      >
        {' '}
        <Link />
        <NavLink style={{ textDecoration: 'none' }} to="/teacher">
          All Courses
        </NavLink>
        <Typography fontWeight="bold">Course</Typography>
      </Breadcrumbs>
      <Box>
        <Box mt="20px" ml="30px">
          <Card
            variant="outlined"
            sx={{ width: 320, border: '1px solid black', boxShadow: 3 }}
          >
            <CardOverflow>
              <AspectRatio ratio="2">
                <img src="https://www.classcentral.com/report/wp-content/uploads/2022/06/C-Programming-BCG-Banner.png" loading="lazy" alt="" />
              </AspectRatio>
            </CardOverflow>
            <Typography
              level="h2"
              sx={{ fontSize: 'md', fontWeight: 'bold', ml:1 , mt: 2, mb: 2 }}
            >
              {course}
            </Typography>

            <Divider />
            <CardOverflow
              variant="soft"
              sx={{
                display: 'flex',
                gap: 1.5,
                py: 1.5,
                px: 'var(--Card-padding)',
                bgcolor: 'background.level1',
              }}
            >
              <Typography
                level="body3"
                sx={{ fontWeight: 'bold', color: 'text.secondary' , ml: 1}}
              >
                Lectured by
              </Typography>
              <Divider orientation="vertical" />
              <Typography
                level="body3"
                sx={{ fontWeight: 'md', color: 'text.secondary' }}
              >
                {teacher}
              </Typography>
            </CardOverflow>
          </Card>
        </Box>
        {/* </Box> */}

        <Box mt="40px" ml="20px">
          <Box width="50%" mt="5px" ml="20px">
            <Tabs aria-label="tabs">
              <TabList
                variant="plain"
                sx={{
                  '--List-padding': '0px',
                  '--List-radius': '0px',
                  '--ListItem-minHeight': '48px',
                  [`& .${tabClasses.root}`]: {
                    boxShadow: 'none',
                    fontWeight: 'md',
                    [`&.${tabClasses.selected}::before`]: {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      left: 'var(--ListItem-paddingLeft)', // change to `0` to stretch to the edge.
                      right: 'var(--ListItem-paddingRight)', // change to `0` to stretch to the edge.
                      bottom: 0,
                      height: 3,
                      bgcolor: 'primary.400',
                    },
                  },
                }}
              >
                <Tab>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/teacher/course/student_list/${course_id}`}
                  >
                    All Student
                  </Link>
                </Tab>
                <Tab>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/teacher/course/session_list/${course_id}`}
                  >
                    All Session
                  </Link>
                </Tab>
                <Tab>
                  <Link
                    style={{ textDecoration: 'none', color: 'black' }}
                    to={`/teacher/course/assignment_list/${course_id}`}
                  >
                    All Assignment
                  </Link>
                </Tab>
              </TabList>
            </Tabs>
          </Box>
        </Box>
        <Box>
          <Card style={{ width: '93%' ,marginLeft: '2%', padding: '10px'}}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                // p: 1,
                // m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                // marginLeft: '10px',
                marginTop: '20px',
                marginRight: '5px',
              }}
            >
              <Box>
                <TextField
                  label="Group"
                  select
                  value={group}
                  onChange={handleChange}
                  style={{ minWidth: 200 }}
                  size="small"
                >
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Group A</MenuItem>
                  <MenuItem value={30}>Group B</MenuItem>
                  <MenuItem value={40}>Group C</MenuItem>
                </TextField>
              </Box>

              <div>
                <Input
                  onChange={(event) => {
                    handleSearch(event.target.value);
                  }}
                  startDecorator={<BiSearch />}
                  sx={{ width: '300px', height: '45px' }}
                  placeholder="Search"
                />
              </div>
            </Box>

            <Sheet
              variant="outlined"
              sx={{
                mt: '15px',
                width: '99%',
                height: '100%',
                boxShadow: 'sm',
                borderRadius: 'sm',
              }}
            >
              <Table aria-labelledby="tableTitle" hoverRow>
                <EnhancedTableHead
                  // numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <tbody>
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      return (
                        <tr
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          style={{
                            textAlign: 'center',
                          }}
                          key={row.name}
                        >
                          <td>{row.student_id}</td>
                          <td>{row.name}</td>
                          <td>{row.gender}</td>
                          <td>{row.group_name}</td>
                          <td>{row.attend}</td>
                          <td>{row.time}</td>
                          <td>
                            <Box
                              sx={{ display: 'flex', justifyContent: 'center' }}
                            >
                              <Button
                                // onClick={() => setOpen(true)}
                                size="sm"
                                variant="soft"
                                color="primary"
                              >
                                <VisibilityIcon />
                              </Button>
                            </Box>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={7}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 2,
                          justifyContent: 'flex-end',
                        }}
                      >
                        <FormControl orientation="horizontal" size="sm">
                          <FormLabel>Rows per page:</FormLabel>
                          <Select
                            onChange={handleChangeRowsPerPage}
                            value={rowsPerPage}
                          >
                            <Option value={5}>5</Option>
                            <Option value={10}>10</Option>
                            <Option value={25}>25</Option>
                          </Select>
                        </FormControl>
                        <Typography textAlign="center" sx={{ minWidth: 80 }}>
                          {labelDisplayedRows({
                            from:
                              rows.length === 0 ? 0 : page * rowsPerPage + 1,
                            to: getLabelDisplayedRowsTo(),
                            count: rows.length === -1 ? -1 : rows.length,
                          })}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton
                            size="sm"
                            color="neutral"
                            variant="outlined"
                            disabled={page === 0}
                            onClick={() => handleChangePage(page - 1)}
                            sx={{ bgcolor: 'background.surface' }}
                          >
                            <KeyboardArrowLeftIcon />
                          </IconButton>
                          <IconButton
                            size="sm"
                            color="neutral"
                            variant="outlined"
                            disabled={
                              rows.length !== -1
                                ? page >=
                                  Math.ceil(rows.length / rowsPerPage) - 1
                                : false
                            }
                            onClick={() => handleChangePage(page + 1)}
                            sx={{ bgcolor: 'background.surface' }}
                          >
                            <KeyboardArrowRightIcon />
                          </IconButton>
                        </Box>
                      </Box>
                    </td>
                  </tr>
                </tfoot>
              </Table>
            </Sheet>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

