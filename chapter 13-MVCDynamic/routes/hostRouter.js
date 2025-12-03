// Core Module
const path = require("path");

// External Module
const express = require("express");
const hostRouter = express.Router();

// Local Module
const rootDir = require("../util/path");
const hostController=require("../Controller/home")

hostRouter.get("/add-home", hostController.getAddHome);


hostRouter.post("/add-home",hostController.postAddHome);

exports.hostRouter = hostRouter;
