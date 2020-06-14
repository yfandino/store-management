import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import SideBar from '../SideBar';
import TopBar from '../TopBar';
import BillingRoutes from '../Billing';

const AuthRoutes = (props) => {

  if (!props.user) return <Redirect to="/login" />;
  
  return (
    <>
      <SideBar />
      <main style={{ marginLeft: 90 }}>
        <TopBar email={props.user.email}/>
        <Switch>
          <Route exact path="/" render={() => "HOME"}/>
          <Route path="/billing">
            <BillingRoutes />
          </Route>
          <Route path="/orders" render={() => "ORDERS"}/>
        </Switch>
      </main>
    </>
  )
};

export default AuthRoutes;