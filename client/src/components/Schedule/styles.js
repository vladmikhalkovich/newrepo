export const styles = ({ spacing }) => ({
  checkBoxContainer: {
    paddingTop: spacing(1),
    paddingBottom: spacing(1),
    paddingLeft: spacing(4),
    marginTop: -1 * spacing(3),
  },
  textField: {
    marginRight: spacing(4),
    marginLeft: spacing(1),
    width: '120px',
  },
  toolbarRoot: {
    position: 'relative',
  },
  progress: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
  },
});
