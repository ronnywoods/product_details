# Project Name

Abibas

Abibas is a recreation of Adidas that designs and manufactures shoes, clothing, and accessories. Abibas is created using React, MySQL, Node, and Express.

## Related Projects

  - https://github.com/abibasss/product_view
  - https://github.com/abibasss/rating-review

## Table of Contents

1. [API](#API)
1. [Requirements](#requirements)
1. [Development](#development)

## API

- /shoes (GET) - Details on 18 products including name, description, image url, etc.
- /shoes/:productId (GET) - Details on product ID in query
- /looks/:productId (GET) - Suggested products to round out the outfit
- /shares (GET) - Mock instagram (picture and username)
- /shoes/:productId (POST) - Add a product to the database
- /shoes/:productId (PATCH) - Make partial modifications to the specified product
- /shoes/:productId (DELETE) - Delete the specified product from the database

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```
