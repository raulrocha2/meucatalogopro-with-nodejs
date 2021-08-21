const Product = require('../models/products');
const dotenv = require('dotenv');
const connectDatabase = require('../config/database');
const products = require('../data/products.json')

dotenv.config({path: 'config/config.env' })

connectDatabase();

const seedProducts = async () => {
    try {

        await Product.deleteMany();
        console.log('Product Deleted');

        await Product.insertMany(products)
        console.log('Product inseted success')

        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();

    }
}
seedProducts()
