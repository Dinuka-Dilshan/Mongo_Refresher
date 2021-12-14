const res = require("express/lib/response");
const { MongoClient } = require("mongodb");
const uri = ``;

const addProduct = async (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price,
  };

  const client = new MongoClient(uri);

  try {
    await client.connect();
    const dataBase = client.db();
    dataBase.collection("myPlace").insertOne(product);
  } catch (error) {
    next(new Error(error));
  }
  res.json(product);
};

const getProducts = async (req,res,next) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db();
    const products = await db.collection("myPlace").find().toArray();
    res.json(products);
  } catch (error) {
      next(error);
  }
};

exports.addProduct = addProduct;
exports.getProducts = getProducts;
