import React from 'react';
import { Link } from 'react-router-dom';

function TopBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Global</Link></li>
        <li><Link to="/user">User</Link></li>
      </ul>
      <ul>
        <li><Link to="/login">Login/Signup</Link></li>
        <li><button>Signout</button></li>
      </ul>
    </nav>
  );
}

export default TopBar;
