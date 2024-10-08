const express = require('express');
const cors = require('cors');
const sequelize = require('./db');
const productRoutes = require('./routes/productRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', productRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => console.log('Server running on http://localhost:5000'));
});
