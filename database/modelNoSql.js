const mongoose = require('mongoose');

let products = new mongoose.Schema({
  _id: String,
  type: String,
  name: String,
  img_url: String,
  short_desc: String,
  long_desc: String,
  category: String,
  price: Number,
  rating: Number,
  review_count: Number,
  view_count: Number,
  details: String,
  completeLook: [{
    id1: String,
    type1: String,
    name1: String,
    img_url1: String,
    price1: Number,
    id2: String,
    type2: String,
    name2: String,
    img_url2: String,
    price2: Number,
    id3: String,
    type3: String,
    name3: String,
    img_url3: String,
    price3: Number
  }]
});

let shares = new mongoose.Schema({
  _id: Number,
  user: String,
  img: String
});

// May need to toggle while seeding:
module.exports.Product = mongoose.model('Product', products);
// export const Product = mongoose.model('Product', products);

module.exports.Share = mongoose.model('Share', shares);
// export const Share = mongoose.model('Share', shares);