import mongoose from 'mongoose';
require('dotenv').config();

const mongoUrl = process.env.MONGO_URL
mongoose.Promise = Promise;
mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function () {  
    console.log('Mongoose default connection open to ' + mongoUrl);
  }); 
mongoose.connection.on('error', (error: Error) => {
    console.log(error);
});

export default mongoose;