import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Box, Typography } from '@material-ui/core';

import CreateUserForm from './CreateUserForm';

class CreateUser extends React.Component {
  render() {
    return (
      <Grid item sm={6}>
        <Paper>
          <Box p={2}>
            <Typography variant="h5" component="h2">
              {'Add new user'}
            </Typography>
            <CreateUserForm updateUsers={this.props.updateUsers} />
          </Box>
        </Paper>
      </Grid>
    );
  }
}

CreateUser.propTypes = {
  updateUsers: PropTypes.func.isRequired,
};

export default CreateUser;
