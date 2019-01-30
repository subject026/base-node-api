const app = require('express')();
const bodyParser = require('body-parser');

const apiRouter = require('./api/Router');

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
