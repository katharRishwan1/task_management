const { mongoose } = require("../services/imports");

module.exports = mongoose.model(
    'user',
    new mongoose.Schema({
        name: String,
        password:String,
        email:String,
        mobile:String,
        status:{type:String,enum:['active','inactive'],default:'active'},
        isDeleted: { type: Boolean, default: false },
    }, { timestamps: true, versionKey: false }),
    'user'
);