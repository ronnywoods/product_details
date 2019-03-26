import cache from '../database/indexRedis.js';
import { Product, Share } from '../database/modelNoSql';

// all async methods of dataStore (plus dataStore.getLooks) will return a promise fulfilled by an object structured as { result: <some result } or { result: <some result>, optionalPassThrough: <some data passed through> } if a 'pass through' object was provided

const dataStore = {
  
  checkIfCachedAsync: (prodId, optionalPassThrough) => {
    return new Promise((resolve, reject) => {
      cache.exists(prodId, (err, result) => {
        if (err) {
          reject(err);
        } else {
          if (optionalPassThrough) {
            resolve({ result, optionalPassThrough });
          } else {
            resolve({ result });
          }
        }
      });
    });
  },
  
  updateTopProdList: () => {
    return Product.find({}).sort({ 'view_count': -1 }).limit(18).lean().exec().then((topProducts) => {
      cache.set('top_products', JSON.stringify(topProducts), () => console.log('Top Products Updated'));
    });
  },

  getTopProdListAsync: (optionalPassThrough) => {
    return new Promise((resolve, reject) => {
      cache.get('top_products', (err, reply) => {
        if (err) {
          reject(err);
        } else {
          let result = JSON.parse(reply);
          if (optionalPassThrough) {
            resolve({ result, optionalPassThrough });
          } else {
            resolve({ result });
          }
        }
      });
    });
  },

  getCachedProductAsync: (prodId, optionalPassThrough) => {
    Product.findOneAndUpdate({ _id: prodId }, { $inc: { view_count: 1 } }, { new: true }).lean();
    return new Promise((resolve, reject) => {
      cache.get(prodId, (err, reply) => {
        if (err) {
          reject(err);
        } else {
          let result = JSON.parse(reply);
          if (optionalPassThrough) {
            resolve({ result, optionalPassThrough });
          } else {
            resolve({ result });
          }
        }
      });
    });
  },

  getStoredProductAsync: (prodId, optionalPassThrough) => {
    return Product.findOneAndUpdate({ _id: prodId }, { $inc: { view_count: 1 } }, { new: true }).lean().exec().then((result) => {
      cache.set(result._id, JSON.stringify(result));
      if (optionalPassThrough) {
        return { result, optionalPassThrough };
      }
      return { result };
    });
  },
  
  getLooks: (product, optionalPassThrough) => {
    let result = {
      pant_name: product.completeLook[0].name1,
      pant_url: product.completeLook[0].img_url1,
      pant_price: product.completeLook[0].price1,
      shirt_name: product.completeLook[0].name2,
      shirt_url: product.completeLook[0].img_url2,
      shirt_price: product.completeLook[0].price2,
      jacket_name: product.completeLook[0].name3,
      jacket_url: product.completeLook[0].img_url3,
      jacket_price: product.completeLook[0].price3
    };
    if (optionalPassThrough) {
      return { result, optionalPassThrough };
    } else {
      return { result };
    }
  },

  getSharesAsync: (optionalPassThrough) => {
    const randomProdNum = () => {
      let max = process.env.NODE_ENV === 'test' ? 100 : 2499990;
      return Math.floor(Math.random() * max) + 1;
    };
    let startId = randomProdNum() * 4;
    return Share.find().where('_id').in([startId, startId + 1, startId + 2, startId + 3, startId + 4]).lean().exec().then((share) => {
      let result = {
        user1: share[0].user,
        img1: share[0].img,
        user2: share[1].user,
        img2: share[1].img,
        user3: share[2].user,
        img3: share[2].img,
        user4: share[3].user,
        img4: share[3].img,
        user5: share[4].user,
        img5: share[4].img
      };
      if (optionalPassThrough) {
        return { result, optionalPassThrough };
      } else {
        return { result };
      }
    });
  }

};

export default dataStore;