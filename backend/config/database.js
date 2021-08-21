const mongoose = require('mongoose');

{process.env.NODE_ENV === 'DEVELOPMENT' ?  (
    databaseURL = process.env.DB_CLUSTER_URI_DEV
    ) : (
        databaseURL = process.env.DB_CLUSTER_URI
        ) 
}

const connectDatabase = () => {
    mongoose.connect(databaseURL , {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(con => {
        console.log(`MongoDB database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase 