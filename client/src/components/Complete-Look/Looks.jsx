import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Looks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeShirt: 'SELECT SIZE',
      sizeJacket: 'SELECT SIZE',
      sizePant: 'SELECT SIZE',
      bagClassShirt: 'disabled',
      bagClassJacket: 'disabled',
      bagClassPant: 'disabled',
      purchaseShirt: true,
      purchasePant: true,
      purchaseJacket: true,
      shirt: false,
      pant: false,
      jacket: false,
    };
    this.selectSizeShirt = this.selectSizeShirt.bind(this);
    this.selectSizeJacket = this.selectSizeJacket.bind(this);
    this.selectSizePant = this.selectSizePant.bind(this);
    this.selectShirt = this.selectShirt.bind(this);
    this.selectJacket = this.selectJacket.bind(this);
    this.selectPant = this.selectPant.bind(this);
  }

  selectSizeShirt(e) {
    this.setState({ sizeShirt: e.target.textContent });
    this.setState({ bagClassShirt: 'enabled', purchaseShirt: false });
    console.log(this.state.purchaseShirt);
  }

  selectSizeJacket(e) {
    this.setState({ sizeJacket: e.target.textContent });
    this.setState({ bagClassJacket: 'enabled' });
    this.setState({ purchaseJacket: false });
  }

  selectSizePant(e) {
    this.setState({ sizePant: e.target.textContent });
    this.setState({ bagClassPant: 'enabled' });
    this.setState({ purchasePant: false });
  }

  selectShirt() {
    this.setState({ shirt: !this.state.shirt });
    this.setState({ pant: false });
    this.setState({ jacket: false });
  }

  selectPant() {
    this.setState({ pant: !this.state.pant });
    this.setState({ shirt: false, jacket: false });
  }

  selectJacket() {
    this.setState({ jacket: !this.state.jacket });
    this.setState({ shirt: false, pant: false });
  }

  render() {
    const cardShirt = this.state.shirt ? 'look-card bottom-bold' : 'look-card';
    const cardPant = this.state.pant ? 'look-card bottom-bold' : 'look-card';
    const cardJacket = this.state.jacket ? 'look-card bottom-bold' : 'look-card';
    return (
      <div className="looks">
        <div className="looks-title">
          <h4> COMPLETE THE LOOK </h4>
        </div>
        <div className="column">
          <div className="looks-pics">
            <div className={cardShirt} id="shirtCard" onClick={this.selectShirt} data-toggle="collapse" data-target="#shirtView" role="button" aria-expanded="false" aria-controls="shirtView">
              <h6>
                <img src={this.props.looks.shirt_url} />
                <br />
                <br />
                ${this.props.looks.shirt_price}
              </h6>
            </div>
            <div className={cardJacket} id="jacketCard" onClick={this.selectJacket} data-toggle="collapse" data-target="#jacketView" role="button" aria-expanded="false" aria-controls="jacketView">
              <h6>
                <img src={this.props.looks.jacket_url} />
                <br />
                <br />
                ${this.props.looks.jacket_price}
              </h6>
            </div>
            <div className={cardPant} id="pantCard" onClick={this.selectPant} data-toggle="collapse" data-target="#pantView" role="button" aria-expanded="false" aria-controls="pantView">
              <h6>
                <img src={this.props.looks.pant_url} />
                <br />
                <br />
                ${this.props.looks.pant_price}
              </h6>
            </div>
          </div>
          <div className="collapse" id="shirtView" data-parent=".looks" aria-labelledby="shirtCard">
            <div className="container">
              <div className="row">
                <div className="col-sm look-img">
                  <img src={this.props.looks.shirt_url} height="180" width="180" />
                </div>
                <div className="col-sm look-desc">
                  <h5 className="look-clothing-name">{this.props.looks.shirt_name}</h5>
                  <h6 className="look-clothing-price">${this.props.looks.shirt_price}</h6>
                  <div className="dropdown dropdown-complete-look">
                    <button className="btn select-size-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="float-left look-size">{this.state.sizeShirt}</span>
                      <i className="arrow down" />
                    </button>
                    <div className="dropdown-menu select-size-dropdown" aria-labelledby="dropdownMenuButton">
                      <div className="select-size-menu">
                        <div className="select-size" onClick={this.selectSizeShirt}>S</div>
                        <div className="select-size" onClick={this.selectSizeShirt}>M</div>
                        <div className="select-size" onClick={this.selectSizeShirt}>L</div>
                        <div className="select-size" onClick={this.selectSizeShirt}>XL</div>
                        <div className="select-size" onClick={this.selectSizeShirt}>2XL</div>
                      </div>
                    </div>
                    <br />
                    <button className={this.state.bagClassShirt} disabled={this.state.purchaseShirt} id="add-to-bag" onClick={this.props.add}>
                      <span className="bag-text">ADD TO BAG</span>
                      <span id="arrow-right">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse" id="jacketView" data-parent=".looks" aria-labelledby="jacketCard">
            <div className="container">
              <div className="row">
                <div className="col-sm look-img">
                  <img src={this.props.looks.jacket_url} height="180" width="180" />
                </div>
                <div className="col-sm look-desc">
                  <h5 className="look-clothing-name">{this.props.looks.jacket_name}</h5>
                  <h6 className="look-clothing-price">${this.props.looks.jacket_price}</h6>
                  <div className="dropdown">
                    <button className="btn select-size-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="float-left look-size">{this.state.sizeJacket}</span>
                      <i className="arrow down" />
                    </button>
                    <div className="dropdown-menu select-size-dropdown" aria-labelledby="dropdownMenuButton">
                      <div className="select-size-menu">
                        <div className="select-size" onClick={this.selectSizeJacket}>S</div>
                        <div className="select-size" onClick={this.selectSizeJacket}>M</div>
                        <div className="select-size" onClick={this.selectSizeJacket}>L</div>
                        <div className="select-size" onClick={this.selectSizeJacket}>XL</div>
                        <div className="select-size" onClick={this.selectSizeJacket}>2XL</div>
                      </div>
                    </div>
                    <br />
                    <button className={this.state.bagClassJacket} disabled={this.state.purchaseJacket} id="add-to-bag" onClick={this.props.add}>
                      <span className="bag-text">ADD TO BAG</span>
                      <span id="arrow-right">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="collapse" id="pantView" data-parent=".looks" aria-labelledby="pantCard">
            <div className="container">
              <div className="row">
                <div className="col-sm look-img">
                  <img src={this.props.looks.pant_url} height="180" width="180" />
                </div>
                <div className="col-sm look-desc">
                  <h5 className="look-clothing-name">{this.props.looks.pant_name}</h5>
                  <h6 className="look-clothing-price">${this.props.looks.pant_price}</h6>
                  <div className="dropdown">
                    <button className="btn select-size-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <span className="float-left look-size">{this.state.sizePant}</span>
                      <i className="arrow down" />
                    </button>
                    <div className="dropdown-menu select-size-dropdown" aria-labelledby="dropdownMenuButton">
                      <div className="select-size-menu">
                        <div className="select-size" onClick={this.selectSizePant}>S</div>
                        <div className="select-size" onClick={this.selectSizePant}>M</div>
                        <div className="select-size" onClick={this.selectSizePant}>L</div>
                        <div className="select-size" onClick={this.selectSizePant}>XL</div>
                        <div className="select-size" onClick={this.selectSizePant}>2XL</div>
                      </div>
                    </div>
                    <br />
                    <button className={this.state.bagClassPant} disabled={this.state.purchasePant} id="add-to-bag" onClick={this.props.add}>
                      <span className="bag-text">ADD TO BAG</span>
                      <span id="arrow-right">&#8594;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Looks.propTypes = {
  looks: PropTypes.object,
};

export default Looks;
