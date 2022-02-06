import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import { makeStyles } from '@mui/styles'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TasksFolders from './components/taskFolder/TasksFolders';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Navbar from './components/navbar/Navbar';
import Tasks from './components/Task/Tasks';
import { loadUser } from './store/actions/authAction';

const useStyles = makeStyles({
  content: {
    margin: '30px auto'
  }
})

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser())
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer position='bottom-right' />
        <Container maxWidth='md'>
          <Navbar />
          <Container className={classes.content}>
            <Routes>
              <Route path='/signin' element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<TasksFolders />} />
              <Route path='/tasks' element={<Tasks />} />
            </Routes>
          </Container>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
