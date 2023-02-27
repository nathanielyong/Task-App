import React from "react";
import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';

const Navbar = (props) => {
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
            <Typography variant="h6" style={{ marginLeft: '10px' }}>
              <Button color="inherit" component={Link} to="/signup" className="link">
                Sign Up
              </Button>
            </Typography>
          }
          {
            props.isLoggedIn &&
            <Typography variant="h6" style={{ marginLeft: 'auto' }}>
              <Button color="inherit" component={Link} onClick={() => props.logout()} to="/login" className="link">
                Logout
              </Button>
            </Typography>
          }
        </Toolbar>
      </AppBar>
    </nav>
  );
}

export default Navbar;