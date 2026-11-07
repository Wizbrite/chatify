import express from "express";

import dotenv from "dotenv";

import {send} from "../controllers/message.controller.js"

dotenv.config();

//initialize the router

const router = express.Router();

router.get("/send",send);

export default router;