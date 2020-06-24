import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router-dom';

import Billing from './Billing';
import CreateInvoice from './CreateInvoice';
import InvoiceViewer from './InvoiceViewer';

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
      <Route path={`${path}/:id`}>
        <InvoiceViewer />
      </Route>
    </Switch>
  )
};

export default BillingRoutes;