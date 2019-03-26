import React from 'react';
import PropTypes from 'prop-types';

const SmPicture = props => {
  return (
    <li>
      <div className="overlay-blk" onMouseEnter={props.enter} onMouseLeave={props.leave}>
        <img className="sm-share img-fluid" src={props.img}></img>
      </div>
      <span className={props.class}>{props.user}</span>
    </li>
  );
};

SmPicture.propTypes = {
  enter: PropTypes.func,
  leave: PropTypes.func,
  user: PropTypes.string,
  class: PropTypes.string,
  img: PropTypes.string,
}

export default SmPicture;
