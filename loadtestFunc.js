module.exports.generateRandomProduct = (userContext, events, done) => {
  const randomSelector = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };
  let types = ['shoe', 'shirt', 'pant', 'jacket'];
  let maxId = 2499999;
  userContext.vars.product = types[randomSelector(4) - 1] + randomSelector(maxId);
  return done();
};