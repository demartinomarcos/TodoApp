import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, IconButton, Menu, MenuItem, Avatar, Divider, ListItemIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { AccountCircleOutlined, Logout, Login, PersonAddOutlined } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../../store/actions/authAction';

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  link: {
    color: '#fafafa',
    textDecoration: 'none'
  },
  auth: {
    color: '#fafafa'
  }
})


const Navbar = () => {
  const classes = useStyles();
  const state = useSelector(state => state);
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    navigate('/signin');
    dispatch(signOut());
  }

  const handleSignIn = () => {
    navigate('/signin');
  }

  const handleSignUp = () => {
    navigate('/signup');
  }

  const handleRefresh = () => {
    dispatch({ type: 'REFRESH_TASKS' })
  }

  const handleAvatarClick = () => {
    dispatch({ type: 'REFRESH_TASKS' })
    navigate('/');
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h4' className={classes.root}>
            <Link to='/' className={classes.link} onClick={() => handleRefresh()}>ToDoApp</Link>
          </Typography>
          <IconButton onClick={handleClick}>
            <AccountCircleOutlined className={classes.link} />
          </IconButton>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose} onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            {auth._id ?
              (<div key={auth.label}>
                <MenuItem>
                  <ListItemIcon>
                    <IconButton onClick={() => handleAvatarClick()}>
                      <AccountCircleOutlined fontSize='small' sx={{ ml: -1, mr: 1 }} />
                      <Typography>{auth.name}</Typography>
                    </IconButton>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <IconButton onClick={() => handleSignOut()}>
                      <Logout fontSize='small' sx={{ ml: -1, mr: 1 }} />
                      <Typography>Sign Out</Typography>
                    </IconButton>
                  </ListItemIcon>
                </MenuItem>
              </div>)
              :
              (<div key={auth.label}>
                <MenuItem>
                  <ListItemIcon>
                    <IconButton onClick={() => handleSignIn()}>
                      <Login fontSize='small' sx={{ ml: -1, mr: 1 }} />
                      <Typography>Sign In</Typography>
                    </IconButton>
                  </ListItemIcon>
                </MenuItem>
                <MenuItem>
                  <ListItemIcon>
                    <IconButton onClick={() => handleSignUp()}>
                      <PersonAddOutlined fontSize='small' sx={{ ml: -1, mr: 1 }} />
                      <Typography>Sign Up</Typography>
                    </IconButton>
                  </ListItemIcon>
                </MenuItem>
              </div>)
            }
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;