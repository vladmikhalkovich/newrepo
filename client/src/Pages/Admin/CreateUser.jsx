import React from 'react';
import useForm from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
} from '@material-ui/core';

import { SECURE_API } from '../../api/config';
import { fields } from './createUserFields';
import { roles } from './userRoles';
import { useStyles } from './styles';

const CreateUser = ({ updateUsers }) => {
  const classes = useStyles();
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      role: roles[1].key,
    },
  });

  const onSubmit = () => {
    SECURE_API.post('admin/add_user', getValues());
    updateUsers();
  };

  const handleChange = event => {
    setValue('role', event.target.value);
  };

  React.useEffect(() => {
    register({ name: 'role', type: 'text', required: true });
  });

  return (
    <Grid item sm={6}>
      <Paper>
        <Box p={2} my={3}>
          <Typography variant="h5" component="h2">
            {'Add new user'}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            {fields.map(field => (
              <TextField
                key={field.id}
                {...field}
                variant="outlined"
                fullWidth
                required
                margin="normal"
                inputRef={register({
                  required: true,
                })}
              />
            ))}
            <TextField
              label="Select user role"
              id="role"
              name="role"
              variant="outlined"
              select
              fullWidth
              required
              margin="normal"
              value={roles[1].key}
              onChange={handleChange}
            >
              {roles.map(role => (
                <MenuItem key={role.key} value={role.key}>
                  {role.name}
                </MenuItem>
              ))}
            </TextField>
            <Box
              display="flex"
              alignItems="stretch"
              className={classes.formButtonGroup}
            >
              <Button
                type="submit"
                size="large"
                variant="contained"
                color="primary"
                fullWidth
              >
                {'Add'}
              </Button>
              <Button
                component={RouterLink}
                type="reset"
                size="large"
                to={'/admin'}
                fullWidth
              >
                {'Cancel'}
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Grid>
  );
};

export default CreateUser;
