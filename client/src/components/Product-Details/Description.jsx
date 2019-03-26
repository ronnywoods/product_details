import React from 'react';
import PropTypes from 'prop-types';

const Description = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm shoe-desc">
          <h2 className="detail-name">{props.shoe.name}</h2>
          <h5 className="short-desc">{props.shoe.short_desc}</h5>
          <p className= "para">{props.shoe.long_desc}</p>
        </div>
        <div className="col-sm shoe-img">
          <img src={props.shoe.img_url}></img>
        </div>
      </div>
    </div>
  )
}

Description.propTypes = {
  shoe: PropTypes.object,
};

export default Description;
