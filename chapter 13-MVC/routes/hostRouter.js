// Core Module
const path = require('path');

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module
const rootDir = require("../util/path");
const homesController=require("../Controller/Home");

hostRouter.get("/add-home", homesControllergetAddHome
)

const registeredHomes = [];

hostRouter.post("/add-home",homesController.postAddHome);

exports.hostRouter = hostRouter;
exports.registeredHomes = registeredHomes;