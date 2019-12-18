import React from 'react';
import { connect } from 'react-redux';
import { Grid, Paper, Box, Typography } from '@material-ui/core';
import { getUserById } from '../../_actions';

import EditUserForm from './EditUserForm';

class EditUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: window.location.href.split('/')[6],
    };
  }

  componentDidMount() {
    this.props.getUserById(this.state.userId);
  }

  render() {
    return (
      <Grid item sm={6}>
        <Paper>
          <Box p={2}>
            <Typography variant="h5" component="h2">
              {'Edit user'}
            </Typography>
            <EditUserForm
              userId={this.state.userId}
              userData={this.props.userData}
              updateUsers={this.props.updateUsers}
            />
          </Box>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.userReducer.userData,
});

const mapDispatchToProps = {
  getUserById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditUser);
