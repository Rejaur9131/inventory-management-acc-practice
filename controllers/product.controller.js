const Product = require('../models/Product');
const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
} = require('../services/product.services');

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.where('name')
    //   .equals(/\w/)
    //   .where('quantity')
    //   .gt(100)
    //   .lt(600)
    //   .limit(2)
    //   .sort({ quantity: -1 });

    const products = await getProductService();

    res.status(200).json({
      status: 'success',
      data: products,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Cannot get the data',
      error: error.message,
    });
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    // Save or create
    // console.log(req.body);

    // Save
    // const product = new Product(req.body);
    // const result = await product.save();

    // create

    const result = await createProductService(req.body);

    result.logger();

    // const product = new Product(req.body);

    // instance creation -> do something -> save()
    // if (product.quantity == 0) {
    //   product.status = 'out-of-stock';
    // }

    // const result = await product.save();

    res.status(200).json({
      status: 'success',
      message: 'Data inserted successfully.',
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Data not inserted',
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateProductService(id, req.body);

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Could not update the product.',
      error: error.message,
    });
  }
};

exports.bulkProductUpdate = async (req, res, next) => {
  try {
    const result = await bulkUpdateProductService(req.body);

    res.status(200).json({
      status: 'Success',
      message: 'Successfully updated the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Could not update the product.',
      error: error.message,
    });
  }
};
