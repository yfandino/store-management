import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, IconButton, Tooltip } from '@material-ui/core';
import { ReceiptOutlined, StoreOutlined } from '@material-ui/icons';

const SideBar = () => {

  const location = useLocation();

  const options = [
    { icon: <ReceiptOutlined fontSize="large" />, title: "Facturación", path: "/billing"},
    { icon: <StoreOutlined fontSize="large"/>, title: "Pedidos", path: "/orders"}
  ];

  return (
    <nav>
      <Drawer variant="permanent" PaperProps={{ elevation: 2 }}>
        <div role="presentation">
          <List>
            {options.map((option, index) => (
              <Link to={option.path} key={index}>
                <Tooltip title={option.title}>
                  <ListItem button className={location.pathname === option.path ? 'selected' : null}>
                    <IconButton color="secondary">{option.icon}</IconButton>
                  </ListItem>
                </Tooltip>
              </Link>
            ))}
          </List>
        </div>
      </Drawer>
    </nav>
  );
}

export default SideBar;