import React from 'react';
import { Container } from '@material-ui/core';

export const renderMainView = (children, classes) => (
  <main className={classes.content}>
    <div className={classes.appBarSpacer} />
    <Container maxWidth="lg" className={classes.container}>
      {children}
    </Container>
  </main>
);
