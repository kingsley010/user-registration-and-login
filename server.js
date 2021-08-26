import express from 'express';
import mongoClient from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/env';
import path from 'path'; 
import cors from 'cors';
import morgan from 'morgan';

require('dotenv').config();

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan('dev'));
//Body-parser Middleware
app.use(bodyParser.json());

// DB Config
// const db = `${MONGO_URI}/${MONGO_DB_NAME}`;
const db = 'mongodb://localhost:27017/azure';

// Connect to Mongo DB
mongoClient.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }) 
  .then(() => console.log(`Connected to MongoDB ${db}`))
  .catch(err => console.log(err));

// Route Files
import items from './routes/itemRoute';
import users from './routes/userRoute';
app.use('/api/v1', items);
app.use('/api/v1', users);

const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start Server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
