import PropTypes from 'prop-types';

const userDataShape = {
  id: PropTypes.any.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  skype: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  avatar: PropTypes.string,
};

export default userDataShape;
