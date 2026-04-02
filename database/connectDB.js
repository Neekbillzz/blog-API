const mongoose = require("mongoose");

const connectDB = async () => {

try {
        await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database Connected Successfully");
} catch (error) {
    console.error("DB connection Failed");
        process.exit(1);
    }
};

module.exports = connectDB;