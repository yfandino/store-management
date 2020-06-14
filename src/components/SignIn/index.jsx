import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Avatar, Button, FormControlLabel, Checkbox, Link, Grid, TextField, Box, Typography, makeStyles, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { Auth, SESSION, LOCAL } from '../../firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.aryaly.com/">
        Aryaly 
      </Link>
      {` ${new Date().getFullYear()}.`}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = (props) => {
  const [remember, setRemenber] = useState(false);
  const [error, setError] = useState(null);

  const classes = useStyles();
  const history = useHistory();

  useEffect(function checkUserSession() {
    Auth.onAuthStateChanged( user => {
      if (user) history.push('/');
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const persistence = remember ? LOCAL : SESSION;
    
    if (!form.email.value) {
      setError("email");
      return;
    }

    if (!form.password.value) {
      setError("password");
      return;
    }

    Auth.setPersistence(persistence)
      .then(
        Auth.signInWithEmailAndPassword(form.email.value, form.password.value)
          .then( res => {
            props.setUser({ res });
            history.push('/')
          })
          .catch( err => setError("form"))
      );
  }

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={onSubmit} method="post">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error={error === "email"}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={error === "password"}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" onChange={() => setRemenber(!remember)} />}
            label="Recuérdame"
          />
          { error === "form" && (
            <Typography color="error">El email no existe o la contraseña es incorrecta</Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignIn;