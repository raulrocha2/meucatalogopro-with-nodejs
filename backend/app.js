const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload');
const path = require('path')


//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'backend/config/config.env' })
//require('dotenv').config({ path: 'backend/config/config.env'})

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//Setting up cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
})

//Import all routes
const products = require('./routes/product');
const user = require('./routes/auth');
const order = require('./routes/order');
const payment = require('./routes/payment')




app.use('/api', products);
app.use('/api', user);
app.use('/api', order);
app.use('/api', payment);

if (process.env.NODE_ENV === 'PRODUCTION') {
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'))
    })
}

//Handler errors Middleware
app.use(errorMiddleware);

module.exports = app