import express from  'express';
import dbConnect from  './DB';
import config from  './config';
import setupMiddleware from  './setupMiddleware';
import restRouter from './api/restRouter';

console.log(config)

const app = express();
dbConnect();
setupMiddleware(app);

app.use('/api', restRouter);

const port = config.port || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
