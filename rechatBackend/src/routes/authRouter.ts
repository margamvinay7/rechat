import express from "express";
import { registerUser, loginUser } from "../controller/user";

// const express = require("express");
// const { registerUser } = require("../controller/user.ts");
const router = express.Router();
console.log("in router");
//@ts-ignore

router.post("/register", registerUser);
//@ts-ignore
router.post("/login", loginUser);
export default router;
