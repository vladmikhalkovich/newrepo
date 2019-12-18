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
  Box,Chip
} from '@material-ui/core';
import ScheduleRoundedIcon from '@material-ui/icons/ScheduleRounded';
import EventRoundedIcon from '@material-ui/icons/EventRounded';

import { useStyles } from './styles';

const CourseCard = ({ courseData }) => {
  const { courseCard, courseCardArea, courseActionArea } = useStyles();
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
    <Card className={courseCard}>
      <CardActionArea to={`${url}/${id}`} component={Link} className={courseCardArea}>
        <CardMedia
          image={imageUrl}
          title={courseName}
          height="240"
          component="img"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {courseName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {courseDescription}
          </Typography>
          <Chip color="secondary" size="small" label={formatCategory(category)} />
          <Box display="flex" m={-1}>
            <Box display="flex" alignItems="center" m={1}>
              <ScheduleRoundedIcon color="secondary" aria-label="course duration" />
              <Typography component="span" variant="body2">{courseDuration} Hours</Typography>
            </Box>
            <Box display="flex" alignItems="center" m={1}>
              <EventRoundedIcon size="small" color="secondary" aria-label="course start date" />
              <Typography component="span" variant="body2">{startDate}</Typography>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <CardActions className={courseActionArea}>
        <Button color="secondary" to={`${url}/${id}`} component={Link}>
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
