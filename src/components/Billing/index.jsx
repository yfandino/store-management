import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Billing from './Billing';
import CreateInvoice from './CreateInvoice';

const BillingRoutes = () => {

  const { path } = useRouteMatch();
  
  return (
    <Switch>
      <Route exact path={path}>
        <Billing />
      </Route>
      <Route path={`${path}/new`}>
        <CreateInvoice />
      </Route>
      <Route path={`${path}/:id`} render={() => "View bill"}/>
    </Switch>
  )
};

export default BillingRoutes;