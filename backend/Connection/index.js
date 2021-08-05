const mongoose = require('mongoose');
const connection = mongoose.connect(process.env.DB_CONNECTION,  { useNewUrlParser: true , useUnifiedTopology: true },
    (error) => error? console.log(error) : console.log('DB connected.')   
);

module.exports = connection;