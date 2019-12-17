import React from 'react';
import PropTypes from 'prop-types';

import {
  CircularProgress,
  Paper,
  Typography,
  Link,
  List,
  ListItem,
} from '@material-ui/core';

const UserCourseList = ({ items }) => {
  return (
    <List>
      {items.map(
        ({
          id,
          courseName,
          courseDescription,
          courseDuration,
          startDate,
          category,
          lector,
        }) => (
          <ListItem key={id + courseName}>
            {id}
            {courseName}
            {courseDescription}
            {courseDuration}
            {startDate}
            {category}
          </ListItem>
        )
      )}
    </List>
  );
};

UserCourseList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseName: PropTypes.string.isRequired,
      courseDescription: PropTypes.string.isRequired,
      courseDuration: PropTypes.number.isRequired,
      startDate: PropTypes.any.isRequired,
      category: PropTypes.string.isRequired,
      lector: PropTypes.object.isRequired,
    })
  ).isRequired,
};

export default UserCourseList;
