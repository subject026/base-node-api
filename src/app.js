const express = require('express');
const dbConnect = require('./DB');

const config = require('./config');
const setupMiddleware = require('./globalMiddleware');
const userRouter = require('./api/resources/user/user.restRouter');

const app = express();
dbConnect();
setupMiddleware(app);

// app.post('/api/user', (req, res) => {
//   res.json({ it: 'works' });
// });

app.use('/api/user', userRouter);

const port = config.port || 8080;
app.listen(port, () => console.log(`App running on port ${port} 🍉 🍓`));
