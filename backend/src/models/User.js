import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },
    fullName:{
        type: String,
        required:true,
    },
    password:{
        type: String,
        required:true,
        minlength:6
    },
    profilePic:{
        type: String,
        default:""
    },

},

{timestamps:true}
);

const User = mongoose.model("User",userSchema) //create a user model based on this schema above

export default User;