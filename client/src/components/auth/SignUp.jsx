import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { signUp } from '../../store/actions/authAction';
import { Navigate } from 'react-router-dom';

const useStyle = makeStyles({
  form: {
    margin: '0px auto',
    padding: '30px',
    borderRadius: '9px',
    boxShadow: '0 0 12px -3px #000000'
  },
  spacing: {
    '&&': {
      marginTop: '20px'
    }
  }
})

const SignUp = () => {
  const classes = useStyle();
  const [user, setUser] = useState({
    name: '',
    password: ''
  });
  const auth = useSelector((state) => state.auth);
  console.log(auth);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp(user));
    setUser({
      name: '',
      password: ''
    })
  };

  if (auth._id) return <Navigate to='/' />

  return (
    <>
      <form noValidate autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
        <Typography variant='h5'>
          Sign Up
        </Typography>
        <TextField className={classes.spacing} id='enter-username' label='Enter username'
          variant='outlined' fullWidth value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
        <TextField className={classes.spacing} type='password' id='enter-password' label='Enter password'
          variant='outlined' fullWidth value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
        <Button className={classes.spacing} variant='contained' color='primary' type='submit'>
          Sign Up
        </Button>
      </form>
    </>
  );
}

export default SignUp;