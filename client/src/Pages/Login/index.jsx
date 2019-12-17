import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { connect } from 'react-redux';
import { Link as RoterLink } from 'react-router-dom';
import { history } from '../../_utils/history';
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Link,
  Typography,
  Container,
  CircularProgress,
} from '@material-ui/core';

import Copyright from '../../components/Copyright';
import { userLogin } from '../../_actions';
import { useStyles } from './styles';

const Login = ({ userLogin, isUserLoginProcessing, isLoggedIn }) => {
  const { handleSubmit, register, errors } = useForm({
    mode: 'onBlur',
  });
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (localStorage.getItem('authToken')) {
      history.push('/dashboard');
    } else {
      setLoading(isUserLoginProcessing);
    }
  }, [isUserLoginProcessing, isLoggedIn]);

  const UsernameProps = {
    id: 'username',
    label: 'Username',
    name: 'username',
    type: 'text',
    autoComplete: 'username',
  };
  const PasswordProps = {
    id: 'password',
    label: 'Password',
    name: 'password',
    type: 'password',
    autoComplete: 'current-password',
  };

  const onSubmit = values => {
    setLoading(true);
    userLogin(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>ui</Avatar>
        <Typography component="h1" variant="h4">
          {'Welcome Back!'}
        </Typography>
        <Typography component="h2" variant="h6">
          {'Sign in to use platfrom'}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
          <TextField
            {...UsernameProps}
            inputRef={register({
              required: 'Required',
            })}
            variant="outlined"
            margin="normal"
            error={errors.username && !!errors.username.message}
            helperText={errors.username && errors.username.message}
            required
            fullWidth
            autoFocus
          />
          <TextField
            {...PasswordProps}
            inputRef={register({
              required: 'Required',
            })}
            error={errors.password && !!errors.password.message}
            helperText={errors.password && errors.password.message}
            variant="outlined"
            margin="normal"
            required
            fullWidth
          />
          <FormControlLabel
            control={
              <Checkbox
                value="remember"
                name="rememberMe"
                color="primary"
                inputRef={register}
              />
            }
            label="Remember me"
          />
          <div className={classes.btnWrapper}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
            >
              {'Sign In'}
            </Button>
            {loading && (
              <CircularProgress size={24} className={classes.buttonProgress} />
            )}
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                {'Forgot password?'}
              </Link>
            </Grid>
            <Grid item>
              <Link to={'/register'} variant="body2" component={RoterLink}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  isUserLoginProcessing: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isUserLoginProcessing: state.authReducer.isUserLoginProcessing,
  isLoggedIn: state.authReducer.isLoggedIn,
});

const mapDispatchToProps = {
  userLogin,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
