import React, { Component } from 'react';
import DropdownMenu from './DropdownMenu.jsx';
import menu from './data.js';

class Topbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: false,
    }
  }

  render() {
    let cart = this.props.cart === 0 ? '' : this.props.cart;
    let iconClass = this.props.cart === 0 ? 'material-icons md-light' : 'material-icons md-light cartIcon';
    let cartClass = this.props.cart === 0 ? '' : 'cart';
    return (
      <div className="sticky-top">
        <div className="topBar">
          <div className="help white">
            <li> HELP</li>
            <li> | </li>
            <li> ORDER TRACKER AND RETURNS</li>
            <li> | </li>
            <li id="fbold"> NEWSLETTER SIGNUP</li>
            <li> LOGIN</li>
            <li></li>
            <i className="material-icons md-light">person</i>
          </div>
        </div>
        <div className="bBar">
          <div className="row width-100">
            <img src="https://s3-us-west-1.amazonaws.com/adidas-shoe/adidas-logo-white.png" width="75" height="75" className="nav-logo d-inline-block align-top"></img>
            <div className="choices">
              <div className="dropdown">
                <li className="choice-menu white" id="men-dropdown" data-toggle="dropdown"> MENS</li>
                <div className="dropdown-menu bar-menu" aria-labelledby="dropdown-men">
                  <div className="menu-men">
                    <DropdownMenu title={'FEATURED'} options={menu.men.featured} />
                    <DropdownMenu title={'SHOES'} options={menu.men.shoes} />
                    <DropdownMenu title={'CLOTHING'} options={menu.men.clothing} />
                    <DropdownMenu title={'ACCESORIES'} options={menu.men.accessories} />
                    <DropdownMenu title={'SPORTS'} options={menu.men.sports} />
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <li className="choice-menu white" id="women-dropdown" data-toggle="dropdown"> WOMENS</li>
                <div className="dropdown-menu bar-menu" aria-labelledby="dropdown-women">
                  <div className="menu-men">
                    <DropdownMenu title={'FEATURED'} options={menu.women.featured} />
                    <DropdownMenu title={'SHOES'} options={menu.women.shoes} />
                    <DropdownMenu title={'CLOTHING'} options={menu.women.clothing} />
                    <DropdownMenu title={'ACCESORIES'} options={menu.women.accessories} />
                    <DropdownMenu title={'SPORTS'} options={menu.women.sports} />
                  </div>
                </div>
              </div>
              <div className="dropdown">
                <li className="choice-menu white" id="kids-dropdown" data-toggle="dropdown"> KIDS</li>
                <div className="dropdown-menu bar-menu" aria-labelledby="dropdown-kids">
                  <div className="menu-men">
                    <DropdownMenu title={'FEATURED'} options={menu.kids.featured} />
                    <DropdownMenu title={'YOUTH\n(8-14)'} options={menu.kids.youth} />
                    <DropdownMenu title={'CHILDREN\n(4-8)'} options={menu.kids.children} />
                    <DropdownMenu title={'BABY\n(0-4)'} options={menu.kids.baby} />
                    <DropdownMenu title={'ACCESSORIES'} options={menu.kids.accessories} />
                  </div>
                </div>
              </div>
              <li className="gray"> | </li>
              <li className="choice-menu white"> SPORTS</li>
              <li className="choice-menu white"> BRANDS</li>
            </div>
          </div>
          <div className="search white">
            <span id="search-box"><i className="material-icons">search</i></span>
            <input type="text" placeholder="search"></input>
            <li></li>
            <div className={cartClass}><i className={iconClass}>shopping_cart</i><span className="cartNum">{cart}</span></div>
          </div>
        </div>
        <div className="shipping-bar">
          <h6>
            <i className="material-icons delivery" height="24" width="24">local_shipping</i>
            <span className="underline">FREE SHIPPING AND RETURNS</span>
            <img className="creators"src="https://s3-us-west-1.amazonaws.com/adidas-shoe/adidas-icon-creator.png" width="24" height="24"></img>
            <span className="underline">CREATORS GET REWARDED - JOIN THE NEW ADIDAS CREATOR CLUB</span>
          </h6>
        </div>
      </div>
    )
  }
}

export default Topbar;
