import mongoClient from 'mongoose';

let database = 'mongodb://localhost:27017/mern_note';
let db = mongoClient.connect( database , {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

module.exports = {
    database,
    db,
    secret: 'yoursecret'
}
