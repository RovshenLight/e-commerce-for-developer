import React from 'react';
import './notfound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="room__content">
    <div className="room">
      <div className="cuboid">
        <div className="side"></div>
        <div className="side"></div>
        <div className="side"></div>
      </div>
      <div className="oops">
        <h2>OOPS!</h2>
        <p>We can't find the page that you're looking for :(</p>
      </div>
      <div className="center-line">
        <div className="hole">
          <div className="ladder-shadow"></div>
          <div className="ladder"></div>
        </div>
        <div className="four">4</div>
        <div className="four">4</div>
        <div className="room_btn">
          <Link to='/'>BACK TO HOME</Link>
        </div>
    </div>
    </div>
    </div>
  );
};

export default NotFound;
