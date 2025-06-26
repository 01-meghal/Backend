const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
    },
    phone:{
        type:String,
        required:true,
        unique:true,
        match: /^[0-9]{10}$/,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
    },
    password:{
         type:String,
        required:true,
    }
})
const UserCollection = mongoose.model("users", userSchema);
module.exports = UserCollection;