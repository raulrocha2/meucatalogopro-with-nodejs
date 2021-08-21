const app = require('./app');
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

//Handle Uncaught exceptions
process.on('uncaughtException' , err => {
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down server due to uncaught exception');
    process.exit(1)
})

// Set cloudinary config
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


//Setting up config file
if (process.env.NODE_ENV !== 'PRODUCTION') require('dotenv').config({ path: 'config/config.env'})

//Connecting to database 
connectDatabase();


const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handler Unhahandled Promise rejections 
process.on('unhahandledRejection', err => {
    console.log(`ERROR: ${err.message}`); 
    console.log('Shutting down the server due to Unhandled Promise rejection');
    server.close(() => {
        process.exit(1)
    })
})