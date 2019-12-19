import React from 'react';
import { connect } from 'react-redux';
import { history } from '../../_utils/history';
import { getCurrentUser } from '../../_actions';

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();

    if (this.props.currentUser.role === 'ROLE_ADMIN') {
      history.push('/admin/users');
    } else {
      history.push('/profile');
    }
  }
  render() {
    return <div></div>;
  }
}

const mapStateToProps = state => ({
  currentUser: state.userReducer.currentUser,
});

const mapDispatchToProps = {
  getCurrentUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
