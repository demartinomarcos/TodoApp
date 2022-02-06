import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { signIn } from '../../store/actions/authAction';
import { Typography, TextField, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
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
});

const SignIn = () => {
  const classes = useStyle();
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [creds, setCreds] = useState({
    name: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(creds))
    setCreds({
      name: '',
      password: ''
    })
  };

  if(auth._id) return <Navigate to='/'/>

  return ( 
    <>
      <form noValidate autoComplete='off' className={classes.form} onSubmit={handleSubmit}>
        <Typography variant='h5'>
          Sign In
        </Typography>
        <TextField id='enter-username' label='Enter username' className={classes.spacing}
          variant='outlined' fullWidth value={creds.name} onChange={(e) => setCreds({...creds, name: e.target.value})}/>
        <TextField type='password' id='enter-password' label='Enter password' className={classes.spacing}
          variant='outlined' fullWidth value={creds.password} onChange={(e) => setCreds({...creds, password: e.target.value})}/>
        <Button className={classes.spacing} variant='contained' color='primary' type='submit'>
          Sign In
        </Button>
      </form>
    </>
  );
}
 
export default SignIn;