import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { formatCategory } from '../../_utils/stringFormatter';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';

const CourseCard = ({ courseData }) => {
  const { url } = useRouteMatch();
  const {
    id,
    courseName,
    courseDescription,
    courseDuration,
    startDate,
    category,
    imageUrl,
  } = courseData;

  return (
    <Card>
      <CardActionArea to={`${url}/${id}`} component={Link}>
        <CardMedia
          image={imageUrl}
          title={courseName}
          height="240"
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {courseName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {courseDescription}
          </Typography>
          <Typography>{courseDuration} hours</Typography>
          <Typography>{formatCategory(category)}</Typography>
          <Typography>{startDate}</Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button color="primary" to={`${url}/${id}`} component={Link}>
          {'Learn More'}
        </Button>
      </CardActions>
    </Card>
  );
};

CourseCard.propTypes = {
  courseData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    courseName: PropTypes.string.isRequired,
    courseDescription: PropTypes.string.isRequired,
    courseDuration: PropTypes.number.isRequired,
    startDate: PropTypes.any.isRequired,
    category: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default CourseCard;
