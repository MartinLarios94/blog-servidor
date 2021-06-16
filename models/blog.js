const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const blogSchema = new Schema({
    Title: {
        type: String,
        required: true,
    },
    Excerpt: {
        type: String,
        required: true,
    },
    Author: {
        type: String,
        required: true,
    },
    Tag: {
        type: String,
        required: true,
    },
    Image: {
        data: String,
        contentType: String
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Blog', blogSchema)