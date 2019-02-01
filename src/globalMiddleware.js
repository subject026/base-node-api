const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

module.exports = (app) => {
  app.use(bodyParser.json({ type: 'application/json' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
  app.use(morgan('dev'));
};
