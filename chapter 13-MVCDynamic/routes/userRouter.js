// Core Modules
const path = require("path");

// External Module
const express = require("express");
const userRouter = express.Router();

// Local Module
const { registeredHomes } = require("./hostRouter");
const hostController = require("../Controller/home");


userRouter.get("/", hostController.getHome);

module.exports = userRouter;
