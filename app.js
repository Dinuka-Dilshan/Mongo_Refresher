const express = require('express');
const app = express();

const mongooose = require('./mongoose');

app.use(express.json());

app.post('/',mongooose.addProduct);
app.get('/',mongooose.getProducts);

app.listen(3000);