import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  formButtonGroup: {
    margin: theme.spacing(2, -1, 0, -1),
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));
