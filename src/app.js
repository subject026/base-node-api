const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const dbConnect = require('./DB');

const config = require('./config');
const apiRouter = require('./api/Router');

const app = express();
dbConnect();

app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5555');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api', apiRouter);

const port = config.port || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
