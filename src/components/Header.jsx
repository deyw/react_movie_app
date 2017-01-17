import React from 'react';
import { Link } from 'react-router';
import './Header.css';

export default () => {
  return (
    <header className="header">
      <div className="header_section">
        <Link 
          to='/'
          className="header_item headerLogo">
          React Movies
        </Link>
        <Link 
          to='/favorites'
          className='header_item headerButton'
          activeClassName="active">
          Favorites
        </Link>
      </div>
    </header>
  );
}
