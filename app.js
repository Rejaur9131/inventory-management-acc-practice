const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// middlewares
app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name for this product.'],
      trim: true,
      unique: [true, 'Name must be unique.'],
      minLength: [3, 'Name must be at least 3 characters.'],
      maxLength: [100, 'Name is too large.'],
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ['Kg', 'Litre', 'Pcs'],
        message: 'Unit value cannot be {VALUE}, must be Kg/Litre/Pcs',
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
      validate: {
        validator: (value) => {
          const isInteger = Number.isInteger(value);
          if (isInteger) {
            return true;
          } else {
            return false;
          }
        },
      },
      message: 'Quantity must be an integer.',
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ['in-stock', 'out-of-stock', 'discontinued'],
        message: 'Status cannot be {VALUE}',
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Supplier',
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// mongoose middlewares for saving data: pre/post

productSchema.pre('save', function (next) {
  // this ->
  console.log('Before saving data');
  if (this.quantity == 0) {
    this.status = 'out-of-stock';
  }
  next();
});

// productSchema.post('save', function (doc, next) {
//   console.log('After saving data');
//   next();
// });

productSchema.methods.logger = function () {
  console.log(`Data saved for ${this.name}`);
};

// Schema ->Model -> Query

const Product = mongoose.model('Product', productSchema);

app.get('/', (req, res) => {
  res.send('Route is working! YaY!');
});

//posting to database
app.post('/api/v1/product', async (req, res, next) => {
  try {
    // Save or create
    // console.log(req.body);

    // Save
    // const product = new Product(req.body);
    // const result = await product.save();

    // create

    const result = await Product.create(req.body);

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
});

app.get('/api/v1/product', async (req, res, next) => {
  try {
    const products = await Product.find({ _id: '632d9f4654c8e3768e370cf6' });

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
});

module.exports = app;
