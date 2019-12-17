import React from 'react';
import { connect } from 'react-redux';
import clsx from 'clsx';
import { Toolbar, InputBase, IconButton, Badge } from '@material-ui/core';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  ExitToAppRounded as ExitToAppRoundedIcon,
} from '@material-ui/icons';

import { userLogout } from '../../_actions';
import { useStyles } from './styles';

const ToolbarView = ({ handleDrawerOpen, open, userLogout }) => {
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
      >
        <MenuIcon />
      </IconButton>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          inputProps={{ 'aria-label': 'search' }}
        />
      </div>
      <div className={classes.grow} />
      <IconButton color="inherit" aria-label="Expand notifications">
        <Badge badgeContent={32} max={99} color="secondary">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      <IconButton color="inherit" onClick={userLogout}>
        <ExitToAppRoundedIcon />
      </IconButton>
    </Toolbar>
  );
};

const mapDispatchToProps = {
  userLogout,
};

export default connect(
  null,
  mapDispatchToProps
)(ToolbarView);
