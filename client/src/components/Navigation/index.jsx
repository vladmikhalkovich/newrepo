import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { List, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import {
  AccountBoxRounded,
  ListAltRounded,
  EventNoteRounded,
} from '@material-ui/icons';
import SupervisorAccountRoundedIcon from '@material-ui/icons/SupervisorAccountRounded';
import useTheme from '@material-ui/core/styles/useTheme';
import { useStyles } from './styles';

const Navigation = ({ user }) => {
  const classes = useStyles();
  const iconColor = useTheme().palette.common.black;


  // {
  //   icon: <DashboardRounded />,
  //     name: 'Dashboard',
  //   link: '/dashboard',
  // },

  const navLinks = [
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
      {!!user.role.length && user.role === 'ROLE_ADMIN' ?
        <ListItem
          button
          to={'/admin/users'}
          component={NavLink}>
          <ListItemIcon style={{ color: iconColor }}><SupervisorAccountRoundedIcon /></ListItemIcon>
          <ListItemText>{'Admin Page'}</ListItemText>
        </ListItem> : (
          navLinks.map(({ icon, name, link }, index) => (
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
          ))
        )
      }
    </List>
  );
};

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.userReducer.currentUser,
});

export default connect(mapStateToProps, null)(Navigation);
