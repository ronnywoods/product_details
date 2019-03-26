// require('newrelic');
import app from './nosqlServer';

const PORT = process.env.NODE_ENV === 'test' ? process.env.PORT || 3000 : process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});