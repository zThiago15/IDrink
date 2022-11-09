const express = require('express');
require('express-async-errors');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const userRoute = require('../routes/userRoute');
const productsRouter = require('../routes/productsRouter');
const registerRoute = require('../routes/registerRoute');
const customerRoutes = require('../routes/customerRoutes');
const userSellersRouter = require('../routes/userSellersRouter');
const userAdminRoutes = require('../routes/adminRouter');
const swaggerDocs = require('../swagger.json');

const app = express();

app.use(express.json());

 app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/login', userRoute);
app.use('/products', productsRouter);
app.use('/register', registerRoute);
app.use('/seller', userSellersRouter);
app.use('/customer', customerRoutes);
app.use('/admin', userAdminRoutes);
app.use(express.static('public'));

app.use((err, _req, res, _next) =>
  res.status(err.code || 500).json({ error: `${err.message}` }));

module.exports = app;
