import React, { useEffect } from 'react';
import useForm from 'react-hook-form';
import { fields } from './editUserFields';
import { Link as RouterLink } from 'react-router-dom';
import { Box, TextField, Button, MenuItem } from '@material-ui/core';

import { SECURE_API } from '../../api/config';
import { roles } from './userRoles';
import { useStyles } from './styles';

const EditUserForm = ({ userData, userId, updt }) => {
  const classes = useStyles();

  const { firstName, lastName, email, skype, role } = userData;

  const { handleSubmit, register, getValues, setValue } = useForm({
    mode: 'onBlur',
    defaultValues: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      skype: skype,
      role: role,
    },
  });

  const onSubmit = () => {
    SECURE_API.put(`admin/${userId}/update_user`, getValues());
    updt();
  };

  const handleChange = event => {
    setValue('role', event.target.value);
  };

  useEffect(() => {
    register({ name: 'role', type: 'text', required: true });
  }, [register]);

  return (
    userData && (
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map(field => (
          <TextField
            key={field.name}
            {...field}
            variant="outlined"
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
            {'Edit'}
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
    )
  );
};

export default EditUserForm;
