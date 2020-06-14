import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CircularProgress, CssBaseline, ThemeProvider } from '@material-ui/core';

import { Auth } from '../firebase';
import SignIn from './SignIn';
import AuthRoutes from './AuthRoutes';

import theme from './theme';

const App = () => {
  const [state, setState] = useState({ loading: true });

  useEffect(function checkUserSession() {
    Auth.onAuthStateChanged( user => {
      if(!user) {
        console.log('Session not found')
        setState({ loading: false });
        return;
      }
      setState({
        user: {
          email: user.email
        },
        loading: false
      })
    });
  }, []);

  const setUser = (user) => {
    setState({
      loading: false,
      user
    })
  }

  if (state.loading) return <CircularProgress />

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/login" render={ () => <SignIn setUser={setUser} />} />
          <AuthRoutes user={state.user} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;