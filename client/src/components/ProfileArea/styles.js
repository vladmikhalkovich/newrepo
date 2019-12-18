import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  userHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 2, 3),
  },
  userAvatar: {
    width: 90,
    height: 90,
    margin: theme.spacing(0, 1, 1),
  },
  userLinks: {
    display: 'flex',
    padding: theme.spacing(1, 2, 1),
  },
  userLink: {
    display: 'flex',
    alignItems: 'center',
    '& + &': {
      marginLeft: theme.spacing(2),
    },
    '& svg': {
      marginRight: theme.spacing(2),
    },
  },
  userActions: {
    display: 'flex',
    justifyContent: 'space-between',
  }
}));
