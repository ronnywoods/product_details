const Layout = (propsForRender, body) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link rel="shortcut icon" href="https://d23lkqa0hnre2j.cloudfront.net/adidas-logo-white.png">
      <link rel="stylesheet" type="text/css" href="https://d23lkqa0hnre2j.cloudfront.net/bootstrap.min.css">
      <link rel="stylesheet" type="text/css" href="https://d23lkqa0hnre2j.cloudfront.net/style-min.css">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"rel="stylesheet">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.7.2/css/all.min.css" integrity="sha256-nAmazAk6vS34Xqo0BSrTb+abbtFlgsFK7NKSi6o7Y78=" crossorigin="anonymous">
      <title>Abibas</title>
    </head>
    <body>
      <div id="product-detail">${body}</div>
      <script>window.propsForRender = ${propsForRender}</script>
      <script src="https://d23lkqa0hnre2j.cloudfront.net/bundle.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.slim.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js"   integrity="sha384-wHAiFfRlMFy6i5SRaxvfOCifBUQy1xHdJ/yoi7FRNXMRBu5WHdZYu1hA6ZOblgut" crossorigin="anonymous"></script>
      <script type="text/javascript" src="https://d23lkqa0hnre2j.cloudfront.net/bootstrap.min.js"></script>
      <script crossorigin src="https://unpkg.com/react@16/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js"></script>
    </body>
  </html>
`;
};

export default Layout;

