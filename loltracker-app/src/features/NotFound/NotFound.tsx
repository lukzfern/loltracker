import React from 'react';
import { Link } from 'react-router-dom';
import './notFound.css';

const NotFound = () => {
  return (
    <div className='NotFound'>
      <h1>Oops! You seem to be lost.</h1>
      <Link style={{ textDecoration: 'none', color: '#ffffff' }} to='/'>{'> Return me to the Home page <'}</Link>
    </div>
  );
}

export default NotFound;
