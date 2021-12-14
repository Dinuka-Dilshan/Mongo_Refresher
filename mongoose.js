const mongoose = require("mongoose");
const Product = require('./models/Product');
require('dotenv').config();
const uri = process.env.DATABASE_URL;

mongoose.connect(uri)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection failed");
  });

const addProduct = async (req,res,next) => {
    const addedProduct = new Product({
        name:req.body.name,
        price:req.body.price
    });

    try{
        const result = await addedProduct.save();
        res.json(result);
    }catch(error){
        res.status(400).json(error.message);
    }
};

const getProducts = async (req,res,next)=>{
    try{
        const products = await Product.find().exec();
        res.json(products);
    }catch(error){
        res.json(error);
    }
}

module.exports = {
    addProduct,
    getProducts
}