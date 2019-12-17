import {makeStyles} from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  isActive: {
    backgroundColor: theme.palette.primary.light,
    boxShadow: `inner 0 -2px 0 0 theme.palette.common.black`
  },
  colorPrimary: {
    color: theme.palette.primary.dark
  }
}));