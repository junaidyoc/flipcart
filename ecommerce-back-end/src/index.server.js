const express = require('express');
const env = require('dotenv')
const app = express();
var bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/admin/authRoutes');

// environment var
env.config();

// mongodb connection
// mongodb+srv://junaid:<password>@cluster0.ydayy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.ydayy.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true
    }
).then(() => {
    console.log('Database Connected');
});


// app.use(express.json());
app.use(bodyParser.json()); // middleware
app.use('/api', authRoutes); 
app.use('/api', adminRoutes); 

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});