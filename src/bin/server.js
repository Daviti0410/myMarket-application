require('dotenv').config();
require('../db/connection');
const { errorConverterMiddleware } = require('../middlewares/errorConverter.middleware');
const { errorHandler } = require('../middlewares/errorHandler.middleware');
const express = require('express');

const routes = require('../routes');

const PORT = 5001;
const version = 'v1';

const app = express();

app.use(express.json());

app.use(`/api/${version}`, routes);

app.use((req, res) =>{
res.statusCode = 404;
return res.json({
  message:'NOT_FOUND'
})
});

app.use(errorConverterMiddleware);
app.use(errorHandler);

app.listen(PORT, ()=> {
  console.log('server listens to port: ', PORT)
});