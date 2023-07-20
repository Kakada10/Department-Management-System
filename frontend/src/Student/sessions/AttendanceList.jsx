import { Box, Button } from '@mui/joy';
import React from 'react';
import { KeyboardArrowLeft } from '@material-ui/icons';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

import PropTypes from 'prop-types';
import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { visuallyHidden } from '@mui/utils';
import { Input } from '@mui/joy';
import { BiSearch } from 'react-icons/bi';

import Breadcrumbs from '@mui/joy/Breadcrumbs';
import { CardOverflow } from '@mui/joy';
import { BiChevronLeft } from 'react-icons/bi';
import { NavLink } from 'react-router-dom';
import { AspectRatio, Divider } from '@mui/joy';
import { courses } from '../variable/constrant';
import Card from '@mui/material/Card';

function createData(id, first_name, last_name, gender, year, group) {
  return {
    id,
    first_name,
    last_name,
    gender,
    year,
    group,
  };
}

const rows = [
  createData(1, 'Cupcake', 'Cupcake', 'Male', 3, 'A', '33S'),
  createData(2, 'Donut', 'Cupcake', 'Male', 3, 'A'),
  createData(3, 'Eclair', 'Cupcake', 'Male', 3, 'A'),
  createData(4, 'Frozen yoghurt', 'Cupcake', 'Male', 3, 'A'),
  createData(5, 'Gingerbread', 'Cupcake', 'Male', 3, 'A'),
  createData(6, 'Honeycomb', 'Cupcake', 'Male', 3, 'A'),
  createData(7, 'Ice cream sandwich', 'Cupcake', 'Male', 3, 'A'),
  createData(8, 'Jelly Bean', 'Cupcake', 'Male', 3, 'A'),
  createData(9, 'KitKat', 'Cupcake', 'Male', 3, 'A'),
  createData(10, 'Lollipop', 'Cupcake', 'Male', 3, 'A'),
];

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
    id: 'first_name',
    numeric: false,
    disablePadding: true,
    label: 'First Name',
  },
  {
    id: 'last_name',
    numeric: false,
    disablePadding: true,
    label: 'Last Name',
  },
  {
    id: 'gender',
    numeric: true,
    disablePadding: false,
    label: 'Gender',
  },
  {
    id: 'year',
    numeric: true,
    disablePadding: false,
    label: 'Year',
  },
  {
    id: 'group',
    numeric: true,
    disablePadding: false,
    label: 'Group',
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

export default function AttendanceList() {
  const { id } = useParams();

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

  const { image, course_name, creator } = courses[id];

  return (
    <Box>
      <Navbar />
      <Box mt="20px" ml="20px">
        <Box>
          <Link
            style={{ textDecoration: 'none', color: 'white' }}
            to={`/student/course/session_list/${id}`}
          >
            <Button
              size="lg"
              variant="solid"
              startDecorator={<KeyboardArrowLeft />}
              color="info"
            >
              Back
            </Button>
          </Link>
        </Box>
      </Box>

      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<BiChevronLeft fontSize="small" />}
      >
        {' '}
        <Link />
        <NavLink style={{ textDecoration: 'none' }} to="/student">
          All Courses
        </NavLink>
        <NavLink
          style={{ textDecoration: 'none' }}
          to={`/student/course/${id}`}
        >
          Course
        </NavLink>
        <Typography fontWeight="bold">List Attendance</Typography>
      </Breadcrumbs>
      {/* <Box> */}
      <Box mt="20px" ml="20px">
        <Card variant="outlined" sx={{ width: 320, border: '1px solid black' }}>
          <CardOverflow>
            <AspectRatio ratio="2">
              <img src={image} loading="lazy" alt="" />
            </AspectRatio>
          </CardOverflow>
          <Typography
            level="h2"
            sx={{ fontSize: 'md', fontWeight: 'bold', mt: 2, mb: 2 }}
          >
            {course_name}
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
              sx={{ fontWeight: 'bold', color: 'text.secondary' }}
            >
              Lectured by
            </Typography>
            <Divider orientation="vertical" />
            <Typography
              level="body3"
              sx={{ fontWeight: 'md', color: 'text.secondary' }}
            >
              {creator}
            </Typography>
          </CardOverflow>
        </Card>
      </Box>

      <Box mt="20px">
        <Input
          startDecorator={<BiSearch />}
          sx={{ width: '300px', height: '45px' }}
          placeholder="Search"
        />
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
                      <td>{row.id}</td>
                      <td>{row.first_name}</td>
                      <td>{row.last_name}</td>
                      <td>{row.gender}</td>
                      <td>{row.year}</td>
                      <td>{row.group}</td>
                    </tr>
                  );
                })}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={6}>
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
                        from: rows.length === 0 ? 0 : page * rowsPerPage + 1,
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
                            ? page >= Math.ceil(rows.length / rowsPerPage) - 1
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
      </Box>
    </Box>
  );
}
