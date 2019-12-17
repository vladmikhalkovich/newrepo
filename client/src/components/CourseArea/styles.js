import { teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(theme => ({
  filterContainer: {
    margin: theme.spacing(0, 1, 1, 1),
    width: '100%',
  },
  btnWrapper: {
    position: 'relative',
    margin: theme.spacing(3, 0, 2),
    display: 'flex',
  },
  buttonProgress: {
    color: teal[400],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: teal[400],
  },
  courseCreatorForm: {
    display: 'flex',
    flexDirection: 'column',
  },
  visuallyHidden: {
    visibility: 'hidden',
    opacity: 0,
    height: 0,
    width: 0,
  },
  listeners: {
    margin: theme.spacing(1, -1 * 0.5),
  },
  courseListener: {
    margin: theme.spacing(0.5),
  },
}));
