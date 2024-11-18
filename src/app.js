const express = require('express');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const rawMaterialRoutes = require('./routes/rawMaterialRoutes');
const variantRoutes = require('./routes/variantRoutes');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

dotenv.config();
const app = express();


app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/raw-materials', rawMaterialRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/orders', orderRoutes);


app.use(errorHandler);

module.exports = app;
