//controllers for auth

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
  
export const signup = async (req, res) => {
    const {fullName,email,password} = req.body; // this is the data we are expecteing. assign this to req.body

    try{
        if(!fullName || !email || !password){
            return res.status(400).json({message:"all fields required"}); //bad request
        }

        if(password.length<6){
            return res.status(400).json({message:"password should be at least 6 characters long!"});
        }

        //check if emails valid: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            return res.status(400).json({message:"Invalid email format"});
        }

        const user = await User.findOne({email});
        if(user) return res.status(400).json({message:"Email aready exists"})

        //hash password if no user is all conditions are satisified
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt);

        //create user with credentials gotten
        const newUser = new User({
            fullName,
            email,
            password: hashPassword
        })

        if(newUser){

            const savedUser = await newUser.save()
            //call to function in utils
            generateToken(savedUser._id,res)

            //return these values to client

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic
            });

            //todo: send a welcome email to client

        } else {
            res.status(400).json({message:"Invalid user data"})
        }
                    
    } catch(error){
        console.log("Error in signup controller",error);
        res.status(500).json({message:"Internal server error"})

    }
}