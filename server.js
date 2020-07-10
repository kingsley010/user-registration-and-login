import express from 'express';
import mongoClient from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/database';
import path from 'path'; 

const app = express();

//Body-parser Middleware
app.use(bodyParser.json());

// On Connection
mongoClient.connection.on('connected', () => {
    console.log(`connected to database ${config.database}`);
});

// On Error
mongoClient.connection.on('error', (err) => {
    console.log(`Database error: ${err}`);
});

// Route Files
import items from './routes/itemRoute';
app.use('/api/v1', items);

const port = process.env.PORT || 5000;

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(expree.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Start Server
app.listen(port, () => {
    console.log(`server started on port ${port}`);
});
