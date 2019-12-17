import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Paper,
  Typography,
  Avatar,
  Link,
  Divider,
} from '@material-ui/core';
import {
  EmailTwoTone as EmailTwoToneIcon,
  CallTwoTone as CallTwoToneIcon,
} from '@material-ui/icons';

import { useStyles } from './styles';

const ProfileArea = ({ user, isLoading }) => {
  const classes = useStyles();
  const [fullName, setFullName] = useState('');
  const [initails, setInitials] = useState('');
  useEffect(() => {
    setFullName(user.firstName + ' ' + user.lastName);
    setInitials(
      user.firstName.charAt(0).toUpperCase() +
        user.lastName.charAt(0).toUpperCase()
    );
  }, [user]);

  return isLoading ? (
    <CircularProgress size={24} />
  ) : (
    <Paper className={classes.userInfoBlock}>
      <div className={classes.userHeader}>
        <Avatar
          alt={initails}
          src={user.avatar}
          className={classes.userAvatar}
        />
        <Typography variant="h4" component="h2">
          {fullName}
        </Typography>
      </div>
      <Divider />
      <div className={classes.userLinks}>
        <Link href={`mailto:${user.email}`}>
          <EmailTwoToneIcon size={24} aria-label="email" />
          {user.email}
        </Link>
        <Link href={`skype:${user.skype}`}>
          <CallTwoToneIcon size={24} aria-label="call skype" />
          {user.skype}
        </Link>
      </div>
    </Paper>
  );
};

ProfileArea.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.any.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    skype: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    role: PropTypes.string,
  }).isRequired,
  isLoading: PropTypes.bool,
};

ProfileArea.defaultProps = {
  isLoading: false,
};

export default ProfileArea;
