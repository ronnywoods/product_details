import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';

const LikeCard = props => (
  <div className="likes-card">
    {props.shoes.map(shoe => (
      <div className="card" onClick={() => props.handleClick(shoe._id)} key={shoe._id}>
        <img className="card-img-top likes d-block" src={shoe.img_url} alt="adidas shoe" />
        <div className="card-body">
          <span className="like-type">{shoe.category}</span>
          <br />
          <span className="like-name">{shoe.name}</span>
          <br />
          <span className="like-price">${shoe.price}</span>
          <br />
          <div className="rating-review">
            <Rating emptySymbol="far fa-star" fullSymbol="fa fa-star" fractions={4} initialRating={Number(shoe.rating)} readonly />
            <span className="rating">{shoe.review_count}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
);

LikeCard.propTypes = {
  shoes: PropTypes.array.isRequired,
  handleClick: PropTypes.func,
};

export default LikeCard;
