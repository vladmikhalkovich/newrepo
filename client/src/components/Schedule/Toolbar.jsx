import React from 'react';
import { Toolbar } from '@devexpress/dx-react-scheduler-material-ui';
import { LinearProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

export const ToolbarWithLoading = withStyles(styles, { name: 'Toolbar' })(
  ({ children, classes, ...restProps }) => (
    <div className={classes.toolbarRoot}>
      <Toolbar.Root {...restProps}>{children}</Toolbar.Root>
      <LinearProgress className={classes.progress} />
    </div>
  )
);
