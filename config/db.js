const mongoose = require('mongoose');
const db = "mongodb+srv://Danish:Danish1234@cluster0.g9mom.mongodb.net/Secrate";

const connectDB = async () => {
    try {
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology : true,
        });
        console.log("connected to database")
    } catch(err){
        console.log("connection fail");
        process.exit(1);
    }
}

module.exports = connectDB;




