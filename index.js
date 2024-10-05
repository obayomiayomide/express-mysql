const express = require('express');
const app = express();
const port = 3003;
var bodyParser = require('body-parser');

app.use(bodyParser.json());

const userRoutes = require('./src/routes/user.route');

app.get('/', (req, res) => {
  res.send('Hello Devs! Whats up');
});

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
