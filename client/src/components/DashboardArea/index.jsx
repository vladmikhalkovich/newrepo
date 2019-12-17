import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Drawer, AppBar, Divider, IconButton } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';

import Navigation from '../Navigation';
import ToolbarView from './ToolbarView';
import { renderMainView } from './mainView';

import { useStyles } from './styles';

const DashboardArea = ({ children }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <ToolbarView handleDrawerOpen={handleDrawerOpen} open={open} />
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Divider />
        <Navigation />
      </Drawer>
      {renderMainView(children, classes)}
    </div>
  );
};

DashboardArea.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DashboardArea;
