import express from "express";

const router = express.Router();

router.get("/signup", (req, res) => {
    res.send("Hello from the backend signup route");
});


router.get("/login", (req, res) => {
    res.send("Hello from the backend login route");
    
});


router.get("/logout", (req, res) => {
    res.send("Hello from the backend logout route");
    
});

export default router;