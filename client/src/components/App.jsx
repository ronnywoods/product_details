import React, { Component } from 'react';
import axios from 'axios';
import Topbar from './Navbar/Topbar';
import Likes from './Also-Like/Likes';
import Looks from './Complete-Look/Looks';
import Description from './Product-Details/Description';
import Specification from './Product-Details/Specification';
import Share from './Share-Photos/Share';

class PageApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      looks: {},
      shoes: [],
      shoe: {},
      details: [],
      shares: {},
      desc: true,
      spec: false,
      cart: 0,
    };

    this.descClick = this.descClick.bind(this);
    this.specClick = this.specClick.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.getOne = this.getOne.bind(this);
    this.getShares = this.getShares.bind(this);
  }

  getAll() {
    axios.get('/shoes')
      .then(shoes => {
        shoes = shoes.data;
        this.setState({shoes});
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  }

  getOne(id) {
    axios.get(`/shoes/${id}`)
    .then( shoe => {
      shoe = shoe.data;
      let looks = {
        pant_name: shoe.completeLook[0].name1,
        pant_url: shoe.completeLook[0].img_url1,
        pant_price: shoe.completeLook[0].price1,
        shirt_name: shoe.completeLook[0].name2,
        shirt_url: shoe.completeLook[0].img_url2,
        shirt_price: shoe.completeLook[0].price2,
        jacket_name: shoe.completeLook[0].name3,
        jacket_url: shoe.completeLook[0].img_url3,
        jacket_price: shoe.completeLook[0].price3
      };
      this.getShares(id);
      this.getAll();
      this.setState({
        details: shoe.details.split(';'),
        shoe,
        looks,
        desc: true,
        spec: false,
      });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  getShares(id) {
    axios.get(`/shares/${id}`)
    .then( shares => {
      shares = {
        user1: shares.data[0].user,
        img1: shares.data[0].img,
        user2: shares.data[1].user,
        img2: shares.data[1].img,
        user3: shares.data[2].user,
        img3: shares.data[2].img,
        user4: shares.data[3].user,
        img4: shares.data[3].img,
        user5: shares.data[4].user,
        img5: shares.data[4].img,
      };
      this.setState({ shares });
    })
    .catch( err => {
      console.log('ERROR: ', err);
    })
  }

  descClick() {
    this.setState({ desc: true, spec: false });
  }

  specClick() {
    this.setState({ desc: false, spec: true });
  }

  addToCart() {
    this.setState({ cart: ++this.state.cart });
  }
  
  render() {
    const descClass = this.state.desc ? 'detail selected' : 'detail unselected';
    const specClass = this.state.spec ? 'detail selected' : 'detail unselected';
    
    let looksRender = Object.keys(this.state.looks).length === 0 ? this.props.looks : this.state.looks;
    let shoesRender = this.state.shoes.length === 0 ? this.props.products : this.state.shoes;
    let shoeRender = Object.keys(this.state.shoe).length === 0 ? this.props.product : this.state.shoe;
    let sharesRender = Object.keys(this.state.shares).length === 0 ? this.props.shares : this.state.shares;

    return (
      <div>
        <Topbar cart={this.state.cart} />
        <div id="top-navbar"></div>
        <Looks looks={looksRender} add={this.addToCart} />
        <div className="product">
          <div className="title-1000">
            <h1> PRODUCT DETAILS </h1>
          </div>
          <div className="details">
            <div className={descClass} id="desc" onClick={this.descClick}>DESCRIPTION</div>
            <div className={specClass} id="spec" onClick={this.specClick}>SPECIFICATIONS</div>
          </div>
          {this.state.desc ? <Description shoe={shoeRender} /> : <Specification details={shoeRender.details.split(';')} />}
        </div>
        <div className="product">
          <div className="title-1000">
            <h1> YOU MAY ALSO LIKE </h1>
          </div>
        </div>
        <Likes shoes={shoesRender} handleClick={this.getOne} />
        <Share shares={sharesRender} />
      </div>
    );
  }
}

export default PageApp;
