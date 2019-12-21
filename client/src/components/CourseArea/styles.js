import { teal } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles(({spacing, palette}) => ({
  filterContainer: {
    margin: spacing(0, 1, 1, 1),
    width: '100%',
  },
  btnWrapper: {
    position: 'relative',
    margin: spacing(3, 0, 2),
    display: 'flex',
    width: 'fit-content',
    '& > .MuiButton-root + .MuiButton-root': {
      marginLeft: spacing(2),
    },
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
      margin: spacing(0.5),
      position: 'absolute',
      top: 0,
      right: 0,
      borderRadius: 4,
      background: `linear-gradient(45deg, ${palette.secondary.light}, ${palette.primary.main})`,
      color: palette.common.black,
      fontWeight: 500,
    },
    '& svg': {
      marginRight: spacing(0.5),
    },
    '& p': {
      marginBottom: spacing(2),
    }
  },
  courseCardArea: { flex: 1 },
  courseActionArea: {
    '& .MuiButton-root': {
      marginLeft: 'auto',
    },
  },
  listeners: {
    display: 'flex',
    margin: spacing(1, -1 * 0.5),
    overflow: 'auto',
  },
  loadListeners: {
    width: '100%',
    margin: spacing(2, 0.5),
  },
  courseListener: {
    margin: spacing(0.5),
  },
  courseDescriptionTable: {
    display: '-webkit-box',
    '-webkit-line-clamp': 3,
    '-webkit-box-orient': 'vertical',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
  courseCreatorForm: {
    display: 'flex',
    flexDirection: 'column',
    '& $btnWrapper': {
      width: '100%',
    }
  },
}));
