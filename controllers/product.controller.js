const Product = require('../models/Product');
const {
  getProductService,
  createProductService,
  updateProductService,
  bulkUpdateProductService,
  deleteProductByIdService,
  bulkDeleteProductService,
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
    console.log(req.query);
    const filters = { ...req.query };
    const excludeFields = ['sort', 'limit', 'page'];

    excludeFields.forEach((field) => delete filters[field]);

    const queries = {};
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      queries.fields = fields;
      console.log(fields);
    }

    // console.log('Original object', req.query);
    // console.log('queryObject object', queryObject);

    const products = await getProductService(filters, queries);

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

exports.bulkProductDelete = async (req, res, next) => {
  try {
    const result = await bulkDeleteProductService(req.body.ids);

    res.status(200).json({
      status: 'Success',
      message: 'Successfully deleted the given products',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Could not delete the given products.',
      error: error.message,
    });
  }
};

exports.deleteProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await deleteProductByIdService(id);

    if (!result.deletedCount) {
      return res.status(400).json({
        status: 'Fail',
        error: 'Could not delete the product',
      });
    }

    res.status(200).json({
      status: 'Success',
      message: 'Successfully deleted the product',
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      message: 'Could not delete the product.',
      error: error.message,
    });
  }
};
