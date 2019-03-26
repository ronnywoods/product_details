const request = require('supertest');
const app = require('../../server/nosqlServer.js');
require('iconv-lite').encodingExists('foo');
const mongoose = require('mongoose');
const seedNoSql = require('../../database/seedNoSql.js');
const Product = require('../../database/modelNoSql').Product;
const Share = require('../../database/modelNoSql').Share;

beforeAll((done) => {
  seedNoSql(400, 1, () => {
    console.log('Database Seeded!');
    done();
  });
});

afterAll((done) => {
  Product.deleteMany({}, () => {
    Share.deleteMany({}, () => {
      mongoose.disconnect(() => done());
    });
  });
});

describe('Express server should route properly', () => {
  it('should respond to GET shoes', (done) => {
    request(app)
    .get('/shoes')
    .expect((res) => {
      expect(res.statusCode).toBe(200);
      expect(res.text.length).toBeGreaterThan(10);
    })
    .end(done);
  })

  it('should respond to GET /shoes/:shoeId', (done) => {
    request(app)
    .get('/shoes/shoe3')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBe(13);
    })
    .end(done);
  })

  it('should respond to GET /shares/:id', (done) => {
    request(app)
    .get('/shares/shirt20')
    .expect( res => {
      expect(res.statusCode).toBe(200);
      expect(Object.keys(JSON.parse(res.text)).length).toBeGreaterThan(4);
    })
    .end(done);
  })

  it('should respond with 404 with invalid GET', (done) => {
    request(app)
    .get('/invalid')
    .expect( res => {
      expect(res.statusCode).toBe(404);
    })
    .end(done);
  })
})
