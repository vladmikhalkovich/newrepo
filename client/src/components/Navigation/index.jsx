import React from 'react';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {
  DashboardRounded,
  AccountBoxRounded,
  ListAltRounded,
  EventNoteRounded,
} from '@material-ui/icons';
import { useStyles } from './styles';
import useTheme from '@material-ui/core/styles/useTheme';

const Navigation = () => {
  const classes = useStyles();
  const iconColor = useTheme().palette.common.black;

  const navLinks = [
    {
      icon: <DashboardRounded />,
      name: 'Admin page',
      link: '/admin/users',
    },
    {
      icon: <AccountBoxRounded />,
      name: 'My profile',
      link: '/profile',
    },
    {
      icon: <ListAltRounded />,
      name: 'All courses',
      link: '/courses',
    },
    {
      icon: <EventNoteRounded />,
      name: 'My calendar',
      link: '/calendar',
    },
  ];

  return (
    <List role="navigation" component="nav">
      {navLinks.map(({ icon, name, link }, index) => (
        <ListItem
          button
          to={link}
          component={NavLink}
          activeClassName={classes.isActive}
          key={name + index}
        >
          <ListItemIcon style={{ color: iconColor }}>{icon}</ListItemIcon>
          <ListItemText>{name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Navigation;
