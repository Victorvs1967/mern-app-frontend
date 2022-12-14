import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';

import { selectIsAuth, fetchSingUp } from '../../redux/slices/auth';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const { register, handleSubmit, setError, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: 'John Smith',
      email: 'john@mail.me',
      password: 'johns',
    },
    mode: 'onChange',
  });

  const onSubmit = async values => {
    const data = await dispatch(fetchSingUp(values));
    console.log(data.payload);
    (data.payload) ?
      alert('Registration success...') :
      alert('Registration faild...');
  };

  if (isAuth) return <Navigate to='/' />;

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <TextField 
          className={styles.field} 
          label="Fullname" 
            type="text"
            error={Boolean(errors.fullName?.message)}
            helperText={ errors.fullName?.message }
            { ...register('fullName', { required: 'Enter fullname...' })}
          fullWidth 
        />
        <TextField 
          className={styles.field} 
          label="E-Mail" 
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={ errors.email?.message }
            { ...register('email', { required: 'Enter email...' })}
          fullWidth 
        />
        <TextField 
          className={styles.field} 
          label="Password" 
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={ errors.password?.message }
            { ...register('password', { required: 'Enter password...' })}
          fullWidth 
        />
        <Button type="submit" size="large" variant="contained" fullWidth disabled={ !isValid }>
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
