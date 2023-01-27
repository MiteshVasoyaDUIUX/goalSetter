const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connection = async()=>{
    const conn = await mongoose.connect(process.env.MONGO_URI);

    if(conn) {
        console.log("Connected with Database...");
    }
}

module.exports = connection;