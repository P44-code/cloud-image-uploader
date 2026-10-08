const mongoose = require('mongoose')

async function connectDB() {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected succefully")

    } catch (error) {
        console.log("error in db connecting")
        threw(error)
    }
}

module.exports = connectDB
