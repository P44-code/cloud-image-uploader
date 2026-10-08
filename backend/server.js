require('dotenv').config();


const app = require('./src/app');
const connectDB = require('./src/db/db');

app.listen(3000, () => {
    console.log("the server is running on port no 3000");

});

connectDB();
