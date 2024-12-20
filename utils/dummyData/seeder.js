const fs = require('fs');//mode at nodejs to read and write
require('colors');//make colours in terminal to make easy for eye
const dotenv = require('dotenv');

dotenv.config({ path: '../../.env' });
const Product = require('../../models/productModel');
const dbConnection = require('../../config/DB');


// connect to DB
dbConnection();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log('Data Inserted'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data Destroyed'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {// for run write node seeder.js -i that -i is no. 2 
  insertData();
} else if (process.argv[2] === '-d') {// for run write node seeder.js -d that -d is no. 2 
  destroyData();
}
