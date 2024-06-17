const mongoose = require('mongoose')

const connectDB = async (url) => {
    try {
        const conn = await mongoose.connect(url)
        console.log(`MongoDB Connected`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1)
    }
}

module.exports = connectDB