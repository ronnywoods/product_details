import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LikeCard from './LikeCard';

class Likes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      prev: 'carousel-control-prev hidden',
      next: 'carousel-control-next',
    };
    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.changePage = this.changePage.bind(this);
    this.checkPage = this.checkPage.bind(this);
  }

  checkPage() {
    const { page } = this.state;
    if (page !== 0) {
      this.setState({ prev: 'carousel-control-prev' });
    }
    if (page === 3) {
      this.setState({ next: 'carousel-control-next hidden' });
    }
    if (page === 0) {
      this.setState({ prev: 'carousel-control-prev hidden' });
    }
    if (page !== 3) {
      this.setState({ next: 'carousel-control-next' });
    }
  }

  handleNext() {
    this.setState({ page: ++this.state.page }, () => {
      this.checkPage();
    });
  }

  handlePrev() {
    this.setState({ page: --this.state.page }, () => {
      this.checkPage();
    });
  }

  changePage(num) {
    this.setState({ page: num }, () => {
      this.checkPage();
    });
  }

  render() {
    const { shoes } = this.props;

    return (
      <div className="like">
        <div id="carouselLikes" className="carousel slide" data-interval="false" data-wrap="false">
          <ol className="carousel-indicators">
            <li data-target="#carouselLikes" data-slide-to="0" className="active" onClick={() => this.changePage(0)} />
            <li data-target="#carouselLikes" data-slide-to="1" onClick={() => this.changePage(1)} />
            <li data-target="#carouselLikes" data-slide-to="2" onClick={() => this.changePage(2)} />
            <li data-target="#carouselLikes" data-slide-to="3" onClick={() => this.changePage(3)} />
          </ol>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <LikeCard shoes={shoes.slice(0, 4)} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes.slice(4, 8)} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes.slice(8, 12)} handleClick={this.props.handleClick} />
            </div>
            <div className="carousel-item">
              <LikeCard shoes={shoes.slice(12, 16)} handleClick={this.props.handleClick} />
            </div>
          </div>
          <div className="control-icons">
            <div className="controls">
              <div className="row control-row">
                <a className={this.state.prev} href="#carouselLikes" role="button" data-slide="prev" onClick={this.handlePrev}>
                  <i className="material-icons prev-icon">chevron_left</i>
                </a>
              </div>
              <div className="row control-row next-pos">
                <a className={this.state.next} href="#carouselLikes" role="button" data-slide="next" onClick={this.handleNext}>
                  <i className="material-icons next-icon">chevron_right</i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Likes.propTypes = {
  handleClick: PropTypes.func,
};


export default Likes;
