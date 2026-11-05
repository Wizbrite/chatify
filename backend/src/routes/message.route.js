import express from "express";

//initialize the router

const router = express.Router();

router.get("/send",(req,res) =>{
    res.send("Hello from the backend send message route");
})

export default router;