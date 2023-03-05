const mongoose = require("mongoose");

const TodoItemSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 1005,
    },
    date: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("TodoItem", TodoItemSchema);