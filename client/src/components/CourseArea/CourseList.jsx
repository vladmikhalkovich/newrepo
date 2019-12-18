import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

import { history } from '../../_utils/history';
import { stableSort, getSorting } from '../../_utils/sortData';
import { formatCategory } from '../../_utils/stringFormatter';
import { formatCourseStart } from '../../_utils/dateHelpers';
import { useStyles } from './styles';

const headCells = [
  {
    id: 'courseName',
    numeric: false,
    disablePadding: false,
    label: 'Course name',
  },
  {
    id: 'courseDescription',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'startDate',
    numeric: true,
    disablePadding: false,
    label: 'Start date',
  },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
];

const CourseList = ({ courses }) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('courseName');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const createSortHandler = property => event => {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  };

  const handleClick = (event, courseId) => {
    history.push(`/courses/${courseId}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            {headCells.map(headCell => (
              <TableCell
                key={headCell.id}
                padding={headCell.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={order}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc'
                        ? 'sorted descending'
                        : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {stableSort(courses, getSorting(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(
              ({ id, courseName, courseDescription, startDate, category }) => (
                <TableRow
                  hover
                  role="link"
                  key={courseName}
                  onClick={e => handleClick(e, id)}
                >
                  <TableCell>{courseName}</TableCell>
                  <TableCell>
                    <span className={classes.courseDescriptionTable}>
                      {courseDescription}
                    </span>
                  </TableCell>
                  <TableCell>{formatCourseStart(startDate)}</TableCell>
                  <TableCell>{formatCategory(category)}</TableCell>
                </TableRow>
              )
            )}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={courses.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
};

export default CourseList;
