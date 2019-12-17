import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  userInfoBlock: {
    padding: theme.spacing(2),
  },
  userHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    marging: {
      top: 0,
      left: 'auto',
      bottom: theme.spacing(3),
      right: 'auto',
    },
  },
}));
