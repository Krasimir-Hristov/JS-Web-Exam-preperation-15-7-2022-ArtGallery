const mongoose = require(`mongoose`);
require('../models/User');
require('../models/Trip');


const dbnName = 'sharedTrip'

const connectionString = `mongodb://localhost:27017/${dbnName}`;

module.exports = async (app) => {
   try{  
    await mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true                
    });

    console.log('Database connected');

    mongoose.connection.on('error', (err) => {
        console.log('Database error');
        console.log(err);
    })
}catch (err) {
    console.error('Error connecting to database');
    process.exit(1);
}
};