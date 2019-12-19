import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { fields } from './editUserFields';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TextField, Button, MenuItem, LinearProgress } from '@material-ui/core';

import Api from '../../api/config';
import { history } from '../../_utils/history';
import { roles } from './userRoles';
import { useStyles } from './styles';

const EditUserForm = ({ userId, userData, updateUsers }) => {
  const classes = useStyles();

  const { handleSubmit, register, getValues, setValue } = useForm({
    mode: 'onBlur',
  });

  const handleChange = event => {
    setValue('role', event.target.value);
  };

  const onSubmit = () => {
    Api().put(`admin/${userId}/update_user`, getValues());
    updateUsers();
    history.push('/admin/users');
  };

  useEffect(() => {
    register({ name: 'role', type: 'text', required: true });
    setValue('role', userData.role);
  }, [register, setValue, userData.role]);

  return (
    userData.firstName.length ? (
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <TextField
            key={field.name}
            {...field}
            variant="outlined"
            defaultValue={userData[field.name]}
            fullWidth
            required
            margin="normal"
            InputLabelProps={{ shrink: true }}
            inputRef={register({
              required: 'Required',
            })}
          />
        ))}
        <TextField
          label="Select user role"
          id="role"
          name="role"
          variant="outlined"
          defaultValue={userData.role}
          select
          fullWidth
          required
          margin="normal"
          onChange={handleChange}
        >
          {roles.map(role => (
            <MenuItem key={role.key} value={role.key}>
              {role.name}
            </MenuItem>
          ))}
        </TextField>
        <Box display="flex" alignItems="stretch" className={classes.formButtonGroup}>
          <Button type="submit" size="large" variant="contained" color="primary" fullWidth>
            {'Edit'}
          </Button>
          <Button size="large" to={'/admin/users'} component={RouterLink} fullWidth>
            {'Cancel'}
          </Button>
        </Box>
      </form>
    ) : <LinearProgress/>
  );
};

export default EditUserForm;
