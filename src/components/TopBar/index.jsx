import React from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Breadcrumbs, Link } from '@material-ui/core';
import { ExitToApp } from '@material-ui/icons';

import { Auth } from '../../firebase';

const breadcrumbNameMap = {
  '/billing': 'Facturación',
  '/billing/new': 'Añadir factura',
  '/orders': 'Pedidos'
};

const Topbar = (props) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleLogout = () => {
    Auth.signOut();
  }

  return (
    <AppBar position="static" color="secondary" elevation={0}>
      <Toolbar>
        <Breadcrumbs className="breadcrumb-title" aria-label="breadcrumb" component="div">
          <Link color="inherit" to="/" component={RouterLink}>
            Inicio
          </Link>
          {pathnames.map( (path, index) => {
            const last = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return last ? (
              <Typography color="textPrimary" key={to}>
                {breadcrumbNameMap[to] || path}
              </Typography>
            ) : (
              <Link color="inherit" to={to} key={to} component={RouterLink}>
                {breadcrumbNameMap[to]}
              </Link>
            )
          })}
        </Breadcrumbs>
        <Typography variant="h6" color="inherit">
          {props.email}
        </Typography>
        <IconButton onClick={handleLogout}>
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;