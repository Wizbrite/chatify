
import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{

    const {JWT_SECRET} = ENV;
    if(!JWT_SECRET){
        throw new Error("JWT_SECRET has not been configured")
    }
    const token = jwt.sign({userId},ENV.JWT_SECRET,{
        expiresIn:"7d"
    });

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, //7days in milliseconds
        httpOnly: true, //prevent XSS attacks: cross-site scripting
        sameSite:"strict",//CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false:true,

        //http://localhost
        //https://dsmakmk.com
    });

    return token;
}