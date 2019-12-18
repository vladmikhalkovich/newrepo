import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Container, Grid, Link } from '@material-ui/core';
import { ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { userLogout, getAllUsers } from '../../_actions';
import UsersList from './UsersList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
  }

  render() {
    const { match, getAllUsers } = this.props;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            {'Logout '}
            <IconButton color="inherit" onClick={this.props.userLogout}>
              <ExitToAppRoundedIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Container maxWidth="md">
          <Grid container spacing={2}>
            <Switch>
              <Route exact path={match.path}>
                <UsersList users={this.props.allUsers} currentUserId={this.props.currentUserId} />
              </Route>
              <Route exact path={`${match.path}/user/create`}>
                <Grid item xs={12}>
                  <Link to="/admin/users" component={RouterLink}>
                    {'Go back'}
                  </Link>
                </Grid>
                <CreateUser updateUsers={getAllUsers} />
              </Route>
              <Route exact path={`${match.path}/edit/:userId`}>
                <Grid item xs={12}>
                  <Link to="/admin/users" component={RouterLink}>
                    {'Go back'}
                  </Link>
                </Grid>
                <EditUser updateUsers={getAllUsers} />
              </Route>
            </Switch>
          </Grid>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUserId: state.userReducer.currentUserId,
  allUsers: state.userReducer.allUsers,
});

const mapDispatchToProps = {
  getAllUsers,
  userLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminPage);
