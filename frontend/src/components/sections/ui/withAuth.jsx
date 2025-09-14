import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext'; // Adjust the path as needed

const withAuth = (WrappedComponent) => {
  const AuthenticatedComponent = (props) => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
      if (!user) {
        e.preventDefault();
        navigate('/login');
      } else if (props.onClick) {
        props.onClick(e);
      }
    };

    return <WrappedComponent {...props} onClick={handleClick} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
