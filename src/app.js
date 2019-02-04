const express = require('express');
const dbConnect = require('./DB');

const config = require('./config');
const setupMiddleware = require('./globalMiddleware');
const restRouter = require('./api/restRouter');

const app = express();
dbConnect();
setupMiddleware(app);

app.use('/api', restRouter);

const port = config.port || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
