const Product = require('../models/Product');

exports.getProductService = async () => {
  const products = await Product.find({});
  return products;
};

exports.createProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};

exports.updateProductService = async (productId, data) => {
  const result = Product.updateOne(
    { _id: productId },
    { $inc: data },
    { runValidators: true }
  );

  // const product = await Product.findById(productId);
  // const result = await product.set(data).save();
  return result;
};
