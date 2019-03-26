# eCommerce Product Details Service

> Displays details (e.g. description, specs, related products) on one of ~10M products (repo includes script to seed MongoDB).

![](demo.gif)

## Tech Stack

  - Javascript
  - Node.js
  - Express
  - React.js
  - MongoDB
  - Mongoose
  - Redis
  - AWS EC2
  - Webpack
  - Babel
  - NewRelic (performance metrics)
  - Artillery (load testing)

## API

- /:productId (GET) - Fully rendered HTML file, followed by bundle that hydrates the HTML
- /product/:productId (POST) - Add a product to the database
- /product/:productId (PUT) - Make partial modifications to the specified product
- /product/:productId (DELETE) - Delete the specified product from the database

## Background

My goal was to improve at-scale performance of legacy code inherited from another engineer.  To baseline performance, I seeded a SQL (mySQL) and noSQL (MongoDB) database with 10M records, and performed a series of load tests based on an expected client interaction.  The app could initally handle 25 new clients per second (CPS) before latency times became unacceptable.

## Results

Within a couple weeks, I was able to increase CPS to over 200 (without relying on any vertical scaling).  Major factors in this performance improvement:

* Refactored APIs to simplify and reduce the number of calls from the client in a typical interaction
* Selected MongoDB (based on measured performance vs mySQL) and deployed of 3 server MongoDB replication set
* Deployed second app server, and put load balancer in front of the two app servers
* Implemented Redis cache with LFU eviction policy in front of load balancer
* Properly minified and compressed static files; offloaded to CDN

## Code Samples
*Note: I've included some code samples here for your convenience.  You are of course welcome to explore the repo more fully.*

*Database Seeding Script: async recursive function*

```javascript
const seedNoSql = (remaining, position, callback = () => console.log('MongoDB seeded!')) => {

  db.on('error', function (err) {
    console.log('Mongo connection error', err);
  });
  db.once('open', function () {
    console.log('Connected to Mongo');
    
    const executeSeed = (remaining, position, callback) => {
      if (((position - 1) * 4) % 100000 === 0) {
        console.log(`On item ${(position - 1) * 4 + 1}`);
      }
      let chunkSize = 400; // MUST be multiple of 4
      let chunk = Math.min(remaining, chunkSize);
      let data = seedGenerator(chunk, position, false);
      return Product.insertMany(data.products).then(() => {
        return Share.insertMany(data.shares);
      }).then(() => {
        let newRemaining = remaining - chunk;
        let newPosition = position + chunkSize / 4;
        if (newRemaining === 0) {
          callback();
        } else {
          executeSeed(newRemaining, newPosition, callback);
        }
      });
    };
    executeSeed(remaining, position, callback);
  });

};

if (process.env.NODE_ENV !== 'test') {
  seedNoSql(10000000, 1, () => {
    db.close(() => console.log('database seeded and closed!'));
  });
}
```

*Main GET API: promise chain to return all necessary data, including fully rendered HTML*

```javascript
app.get('/:shoeId', (req, res) => {
  let prodId = req.params.shoeId;
  return dataStore.checkIfCachedAsync(prodId, prodId).then((cached) => {
    if (cached.result) {
      return dataStore.getCachedProductAsync(cached.optionalPassThrough, {});
    } else {
      return dataStore.getStoredProductAsync(cached.optionalPassThrough, {});
    }
  }).then((product) => {
    return dataStore.getLooks(product.result, Object.assign({ product: product.result }, product.optionalPassThrough));
  }).then((looks) => {
    return dataStore.getSharesAsync(Object.assign({ looks: looks.result }, looks.optionalPassThrough));
  }).then((shares) => {
    return dataStore.getTopProdListAsync(Object.assign({ shares: shares.result }, shares.optionalPassThrough));
  }).then((products) => {
    return renderToHTML(Object.assign({ products: products.result }, products.optionalPassThrough));
  }).then((html) => {
    res.status(200).send(html);
  }).catch((err) => {
    console.log(`Error in main API ${err}`);
    res.status(503).send(err);
  });
});
```

*Cache Server: Is data available?  If yes, send it, if no, request app server and store provided data*

```javascript
const handleGetReq = (url) => {
  let cacheId = 'get' + url;
  return helpers.getCachedDataAsync(cacheId, cacheId).then((data) => {
    if (data.reply) {
      console.log(`using cache for ${data.passThrough}`);
      return data.reply;
    } else {
      console.log(`MONGO: ${data.passThrough}`);
      return new Promise ((resolve, reject) => {
        request(`http://productDetailsLoadBalancer-2032199182.us-east-1.elb.amazonaws.com${url}`, (error, response, body) => {
          if (error) {
            reject(error);
          } else {
            helpers.putInCacheAsync(data.passThrough, body);
            resolve(body);
          }
        });
      })
    }
  })
};

app.get('/:shoeId', (req, res) => {
  let url = `/${req.params.shoeId}`;
  return handleGetReq(url).then((shoe) => {
    res.status(200).send(shoe);
  }).catch((err) => {
    console.log(`There was an issue: ${err}`);
    res.status(503).send(err);
  })
});
```