import React from 'react';
import { Link } from 'react-router-dom';

const Copyright = props => {
  const { className } = props;
  return (
    <p className={`${className} text-muted text-small`}>
      <small>
        Copyright © {new Date().getFullYear()} by <Link to="/">Devly</Link>. All
        rights reserved.
      </small>
    </p>
  );
};

export default Copyright;
