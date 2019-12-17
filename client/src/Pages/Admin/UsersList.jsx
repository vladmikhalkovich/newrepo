import React from 'react';
import { Link as RouterLink, useRouteMatch } from 'react-router-dom';
import {
  IconButton,
  Grid,
  Paper,
  Box,
  Avatar,
  Typography,
  Link,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@material-ui/core';
import { EditRounded as EditRoundedIcon } from '@material-ui/icons';

const UsersList = ({ users, currentUserId }) => {
  const { path } = useRouteMatch();

  return (
    <Grid item xs={12}>
      <Box
        py={1}
        px={2}
        my={1}
        display="flex"
        alignItems="baseline"
        justifyContent="space-between"
      >
        <Typography variant="h4" component="h2">
          Users
        </Typography>
        <Button component={RouterLink} to={`${path}/user/create`}>
          {'Add new'}
        </Button>
      </Box>
      <Paper>
        <Box p={1} mb={1}>
          <List>
            {users.map(({ id, firstName, lastName, email }) => {
              return (
                <React.Fragment key={`userItem ${id}`}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={firstName}
                        src={`https://i.pravatar.cc/150?u=${id}`}
                      ></Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={firstName + ' ' + lastName}
                      secondary={<Link href={`mailto:${email}`}>{email}</Link>}
                    />
                    {currentUserId !== id ? (
                      <ListItemSecondaryAction>
                        <IconButton
                          to={`${path}/user/edit/${id}`}
                          component={RouterLink}
                        >
                          <EditRoundedIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    ) : (
                      ''
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </Paper>
    </Grid>
  );
};

export default UsersList;
