import express from "express";


export const send = async(req,res)=>{
    res.send("Hello from the backend send message route");
}