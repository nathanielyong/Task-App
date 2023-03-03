import React, { useState, useEffect } from "react";
import jwt_decode from 'jwt-decode';
import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import Logout from '@mui/icons-material/Logout';

const Navbar = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    if (props.isLoggedIn) {
      const decoded = jwt_decode(localStorage.getItem('jwt_token'));
      if (decoded) 
        setUsername(decoded.username);
    }
  }, [props.isLoggedIn]);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    handleClose();
    props.logout();
  };

  return (
    <nav>
      <AppBar>
        <Toolbar>
          <IconButton>
            <Link to="/" className="link">
              <HomeIcon />
            </Link>
          </IconButton>
          {
            !props.isLoggedIn &&
            <Typography variant="h6" style={{ marginLeft: 'auto' }}>
              <Button color="inherit" component={Link} to="/login" className="link">
                Login
              </Button>
            </Typography>
          }
          {
            !props.isLoggedIn &&
            <Typography variant="h6" style={{ marginLeft: '8px' }}>
              <Button color="inherit" component={Link} to="/signup" className="link">
                Sign Up
              </Button>
            </Typography>
          }
          {
            props.isLoggedIn &&
            <div style={{ marginLeft: 'auto' }}>
              <IconButton onClick={handleClick} >
                <Avatar />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                onClick={handleClose}
                keepMounted
                open={Boolean(anchorEl)}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> 
                  { username ? username : 'Profile' }
                </MenuItem>
                <MenuItem onClick={logout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default Navbar;