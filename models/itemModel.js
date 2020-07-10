import mongoClient from 'mongoose';

// Create Schema
const itemSchema = mongoClient.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    note: {
        type: String,
        // required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Item = mongoClient.model('item', itemSchema);

export default Item;
