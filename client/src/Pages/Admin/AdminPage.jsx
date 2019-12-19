import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, IconButton, Container, Grid, Link, LinearProgress } from '@material-ui/core';
import { ExitToAppRounded as ExitToAppRoundedIcon } from '@material-ui/icons';
import { userLogout, getAllUsers, getCurrentUser } from '../../_actions';
import UsersList from './UsersList';
import CreateUser from './CreateUser';
import EditUser from './EditUser';

// import { history } from '../../_utils/history';


class AdminPage extends React.Component {
  componentDidMount() {
    this.props.getAllUsers();
    this.props.getCurrentUser();
  }

  render() {
    const { match, getAllUsers, user } = this.props;

    const renderPageContent = () => {
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
    };

    return user.role.length ?
      user.role === 'ROLE_ADMIN' ?
        renderPageContent()
        : <Redirect to="/courses" />
      : <LinearProgress />
  }
}

const mapStateToProps = state => ({
  currentUserId: state.userReducer.currentUserId,
  allUsers: state.userReducer.allUsers,
  user: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getAllUsers,
  getCurrentUser,
  userLogout,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminPage);
