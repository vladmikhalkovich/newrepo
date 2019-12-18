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
  courseCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    '& .MuiChip-root': {
      margin: theme.spacing(0.5),
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: 4,
      background: `linear-gradient(45deg, ${theme.palette.secondary.light}, ${theme.palette.primary.main})`,
      color: theme.palette.common.black,
      fontWeight: 500,
    },
    '& svg': {
      marginRight: theme.spacing(0.5),
    },
    '& p': {
      marginBottom: theme.spacing(2),
    }
  },
  courseCardArea: { flex: 1 },
  courseActionArea: {
    '& .MuiButton-root': {
      marginLeft: 'auto',
    },
  },
  listeners: {
    margin: theme.spacing(1, -1 * 0.5),
  },
  courseListener: {
    margin: theme.spacing(0.5),
  },
  courseDescriptionTable: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
