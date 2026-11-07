//controllers for auth

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import { ENV } from "../lib/env.js";
  
export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "all fields required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password should be at least 6 characters long!" });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName,
            email: email.toLowerCase(),
            password: hashPassword
        });

        const savedUser = await newUser.save();
        generateToken(savedUser._id, res);

        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic
        });

        //email display

        try {
            await sendWelcomeEmail(savedUser.email, savedUser.fullName, ENV.CLIENT_URL);
        } catch (emailError) {
            console.error("Failed to send welcome email:", emailError);
        }
    } catch (error) {
        console.error("Error in signup controller", error);

        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const login = async (req, res)=>{
    const {email,password} = req.body
    try{

        const user = await User.findOne({email});

        if(!user) return res.status(400).json({message:"Invalid email or password"});

        const isPasswordCorrect = await bcrypt.compare(password,user.password)
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid email or password"});

        generateToken(user._id,res);

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic: user.profilePic
        });


    } catch(error){

        console.error("Error in Login controler",error);
        res.status(500).json({message:"Internal Server error"})

    };
}

export const logout = (_,res)=>{

    res.cookie("jwt","",{maxAge:0})
    res.status(200).json({message:"Logged Out sucessfully"})

}