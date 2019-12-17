import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import * as serviceWorker from './serviceWorker';
import rootReducer from './_reducers';

import App from './App';

const theme = createMuiTheme({
  palette: {
    common: {
      black: 'rgba(31, 17, 76, 1)',
      white: '#fff',
    },
    background: {
      paper: '#fff',
      'default': '#fafafa',
    },
    primary: {
      light: 'rgba(221, 227, 252, 1)',
      main: 'rgba(160, 168, 246, 1)',
      dark: 'rgba(105, 113, 237, 1)',
      contrastText: 'rgba(22, 18, 51, 1)',
    },
    secondary: {
      light: 'rgba(226, 250, 246, 1)',
      main: 'rgba(0, 209, 180, 1)',
      dark: 'rgba(4, 167, 144, 1)',
      contrastText: '#fff',
    },
    error: {
      light: 'rgba(252, 195, 168, 1)',
      main: 'rgba(239, 106, 86, 1)',
      dark: 'rgba(236, 71, 46, 1)',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgb(45,37,77)',
      secondary: 'rgba(53, 45, 112, 1)',
      disabled: 'rgba(224, 223, 235, 1)',
      hint: 'rgba(87, 80, 143, 1)',
    },
  },
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
