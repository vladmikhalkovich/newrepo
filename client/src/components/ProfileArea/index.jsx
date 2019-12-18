import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  Card,
  CardActions,
  Typography,
  Avatar,
  Link,
  Divider,
  Button,
} from '@material-ui/core';
import {
  EmailTwoTone as EmailTwoToneIcon,
  CallTwoTone as CallTwoToneIcon,
  EditRounded as EditRoundedIcon,
} from '@material-ui/icons';

import { useStyles } from './styles';

const ProfileArea = ({ user, isLoading, isCurrentUser }) => {
  const { userHeader, userAvatar, userLinks, userLink, userActions } = useStyles();
  const [fullName, setFullName] = useState('');
  const [initials, setInitials] = useState('');

  useEffect(() => {
    setFullName(user.firstName + ' ' + user.lastName);
    setInitials(
      user.firstName.charAt(0).toUpperCase() +
      user.lastName.charAt(0).toUpperCase(),
    );
  }, [user]);

  return isLoading ? (
    <CircularProgress size={24} />
  ) : (
    <Card>
      <div className={userHeader}>
        <Avatar
          alt={initials}
          src={user.avatar}
          className={userAvatar}
        />
        <Typography variant="h4" component="h2">
          {fullName}
        </Typography>
      </div>
      <Divider />
      <CardActions className={userActions}>
        <div className={userLinks}>
          <Link href={`mailto:${user.email}`} className={userLink} color="secondary">
            <EmailTwoToneIcon size={24} aria-label="email" />
            {user.email}
          </Link>
          <Link href={`skype:${user.skype}`} className={userLink} color="secondary">
            <CallTwoToneIcon size={24} aria-label="call skype" />
            {user.skype}
          </Link>
        </div>
        {isCurrentUser ? <Button color="secondary" startIcon={<EditRoundedIcon />}>{'Edit my profile'}</Button> : ''}
      </CardActions>
    </Card>
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
  isCurrentUser: PropTypes.bool.isRequired,
};

ProfileArea.defaultProps = {
  isLoading: false,
};

export default ProfileArea;
