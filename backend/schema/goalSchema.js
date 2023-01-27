const mongoose = require('mongoose');


const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : 'User'
    }, 
    goal: {
        type: String,
        required: [true, 'Please add a Goal value'],
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Goals', goalSchema);