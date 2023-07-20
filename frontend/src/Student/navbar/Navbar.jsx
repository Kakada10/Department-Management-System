import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  alpha,
  InputBase,
  Box,
  // Tooltip,
  IconButton,
  MenuItem,
  Avatar,
  Menu,
  Button,
  Stack,
} from '@mui/material';
import React from 'react';
import logo from '../../assets/gic4.png';
import SearchIcon from '@mui/icons-material/Search';
// import './Header.scss';
import MenuIcon from '@mui/icons-material/Menu';
// import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
// import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';
import { Link } from 'react-router-dom';
// import Link from '@mui/material';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuList from '@mui/material/MenuList';

// import ListItemIcon from '@mui/material/ListItemIcon';
// import Divider from '@mui/material/Divider';

// import PersonAdd from '@mui/icons-material/PersonAdd';
// import Settings from '@mui/icons-material/Settings';
// import Logout from '@mui/icons-material/Logout';

const pages = ['Messages', 'Reports'];

const Logo = styled('img')(({ theme }) => ({
  width: '5rem',
  minWidth: '4rem',
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '50px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  // minWidth:'300px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const Header = () => {
  // const [anchorElUser, setAnchorElUser] = useState(null);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <AppBar
      position="static"
      className="header"
      style={{ background: '#007bb2' }}
    >
      <Toolbar className="toolbar">
        <Logo src={logo} />
        <Search sx={{ display: { xs: 'none', md: 'flex' } }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>

        {/* Menus */}

        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: 'block', md: 'none' },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page} onClick={handleCloseNavMenu}>
                <Typography textAlign="center">{page}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: 'flex', md: 'none' },
            flexGrow: 1,
            fontFamily: 'monospace',
            fontWeight: 700,
            letterSpacing: '.3rem',
            color: 'inherit',
            textDecoration: 'none',
          }}
        >
          SCHOOL MANAGEMENT
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          {pages.map((page) => (
            <Button
              key={page}
              onClick={handleCloseNavMenu}
              sx={{
                my: 2,
                color: 'white',
                display: 'block',
                textTransform: 'none',
                fontWeight: 400,
              }}
            >
              {page}
            </Button>
          ))}
        </Box>

        {/* <Box sx={{ flexGrow: 1 }}>
          <Tooltip title='Help'>
            <IconButton disableRipple={true} style={{ color: 'white' }}>
              <QuestionMarkIcon />
            </IconButton>
          </Tooltip>
          <IconButton disableRipple={true} style={{ color: 'white' }}>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton disableRipple={true} style={{ color: 'white' }}>
            <NearMeOutlinedIcon />
          </IconButton>
        </Box> */}

        <Stack>
          <div>
            <Button
              ref={anchorRef}
              id="composition-button"
              aria-controls={open ? 'composition-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleToggle}
            >
              <Avatar alt="Profile" src="../assets/profile.jpg" />
            </Button>
            <Popper
              open={open}
              anchorEl={anchorRef.current}
              role={undefined}
              placement="bottom-start"
              transition
              disablePortal
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-start' ? 'left top' : 'left bottom',
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                      <MenuList
                        autoFocusItem={open}
                        id="composition-menu"
                        aria-labelledby="composition-button"
                        onKeyDown={handleListKeyDown}
                      >
                        <MenuItem>
                          <Link
                            style={{ textDecoration: 'none', py: '0' }}
                            to={`/teacher/profile`}
                          >
                            <p> Profile</p>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            style={{ textDecoration: 'none', py: '0' }}
                            to={`/teacher/profile`}
                          >
                            <p> My account</p>
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            style={{ textDecoration: 'none', py: '0' }}
                            to={`/signin`}
                          >
                            <p> Logout</p>
                          </Link>
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
