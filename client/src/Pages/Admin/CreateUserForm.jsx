import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TextField, Button, MenuItem } from '@material-ui/core';

import Api from '../../api/config';
import { fields } from './createUserFields';
import { roles } from './userRoles';
import { useStyles } from './styles';

const CreateUserForm = ({ updateUsers }) => {
  const classes = useStyles();
  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      role: roles[1].key,
    },
  });

  const onSubmit = () => {
    Api().post('admin/add_user', getValues());
    updateUsers();
  };

  const handleChange = event => {
    setValue('role', event.target.value);
  };

  useEffect(() => {
    register({ name: 'role', type: 'text', required: true });
  });

  return (
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
      <Box display="flex" alignItems="stretch" className={classes.formButtonGroup}>
        <Button type="submit" size="large" variant="contained" color="primary" fullWidth>
          {'Add'}
        </Button>
        <Button type="reset" size="large" to={'/admin/users'} component={RouterLink} fullWidth>
          {'Cancel'}
        </Button>
      </Box>
    </form>
  );
};

CreateUserForm.propTypes = {
  updateUsers: PropTypes.func.isRequired,
};

export default CreateUserForm;
