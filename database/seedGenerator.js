const seedGenerator = (recordCount, idStart, sql = true) => {
  let products;
  let looks;
  let shares;
  
  // random number and picker helpers
  const getRandomNumber = (max) => Math.ceil(Math.random() * (max));
  const pickRandom = (arr) => arr[getRandomNumber(arr.length) - 1];

  // product name generator
  const getProdName = () => {
    
    const mainWord = 'Drago Dragon Whitesnake Hopper Runs Runner Keds Walker Freestyle Forever AirForever WhyNot Fashion Styled1 Styled2 Alabama California West Coast Kid Wannabe Eleven Crybaby Stars Stripes Bootstalk Beanstalk Pages XXVI XVIX VI VXE XRA6 BoyOhBoy XXX Lexar Hampshire OrGone OrStay Maine Hamptons'.split(' ');

    const nextWord = ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ' Flier', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '-2018', '-2019', '-1999', '-2000', ' NEXT', ' Air', ' Force', ' Stripe', 'StarsAndStripes', ' Kyrie', ' - The Beard Edition', 'EDITION'];
    
    return pickRandom(mainWord) + pickRandom(nextWord);

  };

  // username generator
  const getUsername = () => {
    
    const words = '_ 1 2 3 4 5 6 7 8 9 A B C playa brooklyn singer baller nyc Heavenly Chuckwagon henry Sally Winston avengers hero Hiro nemo Dory bling Uptown 84 27 99 1984 user guy Gal winner chicken bully Insect King 1234 1 gary James Henrieta Mary wilson mcdonald macDaddy Cal Eva blue red Black cream'.split(' ');
    
    return pickRandom(words) + pickRandom(words) + pickRandom(words);

  };

  // image url generator
  const getImageUrl = () => {
    
    const imageNames = ['adidas', 'basketball', 'clothing', 'fashion', 'footwear', 'hat', 'nike', 'running', 'shirt', 'shoe', 'shoes', 'shorts', 'sketchers', 'sneakers', 'soccer', 'sports', 'style', 'tennis', 'training', 'uniform', ];

    return `https://s3-us-west-2.amazonaws.com/shoeimagestresrayas/${pickRandom(imageNames) + getRandomNumber(50)}.png`;

  };
  
  // description generator
  const getDesc = (sentenceCount) => {
    
    const sentences = [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Vivamus nec nisi quis sem dictum vehicula non sed ligula.',
      'Sed iaculis maximus condimentum.',
      'Curabitur placerat augue sed varius porttitor.',
      'Curabitur leo tortor, varius sed mauris ac, vulputate ultricies ipsum.',
      'Quisque at ipsum libero.',
      'Donec nec sem eu nibh facilisis rutrum vitae nec eros.',
      'In a lectus sed massa dictum volutpat!',
      'Nam mattis quam a risus imperdiet, at accumsan sem posuere.',
      'Proin pharetra ligula at dui iaculis, eget volutpat turpis congue.',
      'Cras quis leo placerat, vulputate mauris quis, sodales sapien?',
      'In hac habitasse platea dictumst.',
      'In eget libero ut mauris mattis ultrices.',
      'Probably the best shoe I have ever worn in my entire life!',
      'You will not ever want to take this off...ever.',
      'Why not just buy it now...do it...DO IT NOW!!!',
      'Lorem ipsum pancakes for dinner.'
    ];
    
    let text = '';
    for (let i = 0; i < sentenceCount; i++) {
      text += pickRandom(sentences);
      if (i < sentenceCount - 1) {
        text += ' ';
      }
    }
    return text;

  };

  // category generator
  const getCategory = () => {
    
    const categories = ['Performance', 'Comfort', 'Originals', 'Essentials'];
    
    return pickRandom(categories);

  };

  // details generator
  const getDetails = () => {
    
    const fit = ['Regular Fit', 'Big and Tall', 'Petite'];
    const closure = ['Lace Closure', 'Zipper Closure', 'Buckle Closure'];
    const fabric = ['Knit Textile Upper', 'Pima Cotton', 'Hard Rubber Bottom', 'Washed Denim'];
    const otherFabric = ['Rubber Outsole', 'Wire Laces', 'Velcro Snap Technology'];
    const addDtl1 = ['Multiple Colors Available', 'Plus Sizes Available', 'Fast Shipping Available', 'Free Shipping Available'];
    const addDtl2 = ['Soft Feel', 'Durable Liner', 'Reversible Liner', 'Water Resistant'];
    const addDtl3 = ['Made in the USA', 'Imported', 'Sustainably Sourced'];
    const addDtl4 = ['Lorem Ipsum', 'Lorem Hipster', 'Blah Blah'];
    const addDtl5 = ['Ipsum Lorem', 'Hipster Lorem', 'Picsum Lipsum', 'Bladi Blah'];
    
    return `${pickRandom(fit)};${pickRandom(closure)};${pickRandom(fabric)};${pickRandom(otherFabric)};${pickRandom(addDtl1)};${pickRandom(addDtl2)};${pickRandom(addDtl3)};${pickRandom(addDtl4)};${pickRandom(addDtl5)}`;

  };
  
  // determine number of each type of product to generate
  let recordsLeft = recordCount;
  const shoeCount = Math.ceil(recordsLeft / 4);
  recordsLeft = recordsLeft - shoeCount;
  const shirtCount = Math.ceil(recordsLeft / 3);
  recordsLeft = recordsLeft - shirtCount;
  const pantCount = Math.ceil(recordsLeft / 2);
  const jacketCount = recordsLeft - pantCount;
  
  // function to populate base product table
  const prodTableData = (arr, numToAdd, type) => {
    for (let i = 0; i < numToAdd; i++) {
      arr.push({
        _id: type + (i + idStart),
        type: type,
        name: getProdName(),
        img_url: getImageUrl(),
        short_desc: getDesc(1),
        long_desc: getDesc(7),
        category: getCategory(),
        price: getRandomNumber(150),
        rating: getRandomNumber(50) / 10,
        review_count: getRandomNumber(1000),
        view_count: 0,
        details: getDetails()
      });
    }
    return arr;
  };
  
  const shoes = prodTableData([], shoeCount, 'shoe');
  const shoesAndShirts = prodTableData(shoes, shirtCount, 'shirt');
  const shoesShirtsAndPants = prodTableData(shoesAndShirts, pantCount, 'pant');
  products = prodTableData(shoesShirtsAndPants, jacketCount, 'jacket');
  
  const looksTableData = () => {
    if (sql) {
      looks = [];
      for (let i = 0; i < shoeCount; i++) {
        let shoe_id = 'shoe' + (i + idStart);
        let shirt_id = i >= shirtCount ? 'shirt' + idStart : 'shirt' + (i + idStart);
        let pant_id = i >= pantCount ? 'pant' + idStart : 'pant' + (i + idStart);
        let jacket_id = i >= jacketCount ? 'jacket' + idStart : 'jacket' + (i + idStart);
        looks.push({ shoe_id, shirt_id, pant_id, jacket_id });
      }
      return looks;
    } else {
      let shoeBeginIndex = 0;
      let shirtBeginIndex = shoeCount;
      let pantBeginIndex = shoeCount + shirtCount;
      let jacketBeginIndex = shoeCount + shirtCount + pantCount;
      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        if (i < shirtBeginIndex) {
          let prodNum = i + 1;
          let shirt = prodNum <= shirtCount ? products[shirtBeginIndex + prodNum - 1] : products[shirtBeginIndex];
          let pant = prodNum <= pantCount ? products[pantBeginIndex + prodNum - 1] : products[pantBeginIndex];
          let jacket = prodNum <= jacketCount ? products[jacketBeginIndex + prodNum - 1] : products[jacketBeginIndex];
          let shirtComplete = { id1: shirt._id, type1: shirt.type, name1: shirt.name, img_url1: shirt.img_url, price1: shirt.price };
          let pantComplete = { id2: pant._id, type2: pant.type, name2: pant.name, img_url2: pant.img_url, price2: pant.price };
          let jacketComplete = { id3: jacket._id, type3: jacket.type, name3: jacket.name, img_url3: jacket.img_url, price3: jacket.price };
          product.completeLook = [ Object.assign(shirtComplete, pantComplete, jacketComplete) ];
        } else if (i < shoeCount + shirtCount) {
          let prodNum = i + 1 - shoeCount;
          let shoe = prodNum <= shoeCount ? products[shoeBeginIndex + prodNum - 1] : products[shoeBeginIndex];
          let pant = prodNum <= pantCount ? products[pantBeginIndex + prodNum - 1] : products[pantBeginIndex];
          let jacket = prodNum <= jacketCount ? products[jacketBeginIndex + prodNum - 1] : products[jacketBeginIndex];
          let shoeComplete = { id1: shoe._id, type1: shoe.type, name1: shoe.name, img_url1: shoe.img_url, price1: shoe.price };
          let pantComplete = { id2: pant._id, type2: pant.type, name2: pant.name, img_url2: pant.img_url, price2: pant.price };
          let jacketComplete = { id3: jacket._id, type3: jacket.type, name3: jacket.name, img_url3: jacket.img_url, price3: jacket.price };
          product.completeLook = [ Object.assign(shoeComplete, pantComplete, jacketComplete) ];
        } else if (i < shoeCount + shirtCount + pantCount) {
          let prodNum = i + 1 - shoeCount - shirtCount;
          let shoe = prodNum <= shoeCount ? products[shoeBeginIndex + prodNum - 1] : products[shoeBeginIndex];
          let shirt = prodNum <= shirtCount ? products[shirtBeginIndex + prodNum - 1] : products[shirtBeginIndex];
          let jacket = prodNum <= jacketCount ? products[jacketBeginIndex + prodNum - 1] : products[jacketBeginIndex];
          let shoeComplete = { id1: shoe._id, type1: shoe.type, name1: shoe.name, img_url1: shoe.img_url, price1: shoe.price };
          let shirtComplete = { id2: shirt._id, type2: shirt.type, name2: shirt.name, img_url2: shirt.img_url, price2: shirt.price };
          let jacketComplete = { id3: jacket._id, type3: jacket.type, name3: jacket.name, img_url3: jacket.img_url, price3: jacket.price };
          product.completeLook = [ Object.assign(shoeComplete, shirtComplete, jacketComplete) ];
        } else {
          let prodNum = i + 1 - shoeCount - shirtCount - pantCount;
          let shoe = prodNum <= shoeCount ? products[shoeBeginIndex + prodNum - 1] : products[shoeBeginIndex];
          let shirt = prodNum <= shirtCount ? products[shirtBeginIndex + prodNum - 1] : products[shirtBeginIndex];
          let pant = prodNum <= pantCount ? products[pantBeginIndex + prodNum - 1] : products[pantBeginIndex];
          let shoeComplete = { id1: shoe._id, type1: shoe.type, name1: shoe.name, img_url1: shoe.img_url, price1: shoe.price };
          let shirtComplete = { id2: shirt._id, type2: shirt.type, name2: shirt.name, img_url2: shirt.img_url, price2: shirt.price };
          let pantComplete = { id3: pant._id, type3: pant.type, name3: pant.name, img_url3: pant.img_url, price3: pant.price };
          product.completeLook = [ Object.assign(shoeComplete, shirtComplete, pantComplete) ];
        }
      }
    }
  };

  looksTableData();

  const sharesTableData = () => {
    shares = [];
    for (let i = 0; i < recordCount; i++) {
      if (sql) {
        shares.push({ user: getUsername(), img: getImageUrl() });
      } else {
        shares.push({ _id: i + (idStart - 1) * 4 + 1, user: getUsername(), img: getImageUrl() });
      }
    }
  };

  sharesTableData();

  return { products, looks, shares };
};

module.exports = seedGenerator;

// console.log(seedGenerator(10, 1));
// console.log(seedGenerator(10, 1, false).products[2]);