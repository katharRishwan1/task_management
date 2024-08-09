const { mongoose } = require("../services/imports");

module.exports = mongoose.model(
    'task',
    new mongoose.Schema({
        name: String,
        description: String,
        date:Date,
        toWhom: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        isDeleted: { type: Boolean, default: false },
    }, { timestamps: true, versionKey: false }),
    'task'
);