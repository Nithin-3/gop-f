import React from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import classes from './styles.module.css';
import Text from '../../atoms/text';

const AuthFooter = ({ type }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    if (type) {
      navigate('/auth/login');
    } else {
      navigate('/auth/signup');
    }
  };

  return (
    <div className={classes.authFooter}>
      <div>
        <Text
          onClick={clickHandler}
          title={type ? 'Already have an account?' : "Don't have an account?"}
          theme='heading5'
          style={{ fontSize: '16px' }}
        />
      </div>
      <Text
        onClick={clickHandler}
        title={type ? 'Log in' : 'Sign up'}
        theme='heading5'
        style={{ fontSize: '16px' }}
      />
    </div>
  );
};

AuthFooter.propTypes = {
  type: PropTypes.bool,
};

export default AuthFooter;
