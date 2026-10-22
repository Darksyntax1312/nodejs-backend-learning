const express = require("express");
const hostRouter = express.Router();
const { getController } = require("../Controller/hostController");
const { postController } = require("../Controller/hostController");
const { resController } = require("../Controller/hostController");
const { homePageController } = require("../Controller/hostController");
const { homeList } = require("../Controller/hostController");
const { homesEdit } = require("../Controller/hostController");
const { homesPostEdit } = require("../Controller/hostController");
const {deleteHome} = require("../Controller/hostController");

// Show form

hostRouter.get("/add-home", getController);

//Add items redirect to homes

hostRouter.post("/add-home", postController);

//Show list on homes

hostRouter.get("/homes", resController);

// Show main host home page

hostRouter.get("/Home-page", homePageController);

// Show admin home list

hostRouter.get("/home-list", homeList);

// show admin edit page

hostRouter.get("/homes-edit/:homeId", homesEdit);
hostRouter.post("/homes-edit/:homeId", homesPostEdit);

// this route handles the requests of delting a home

hostRouter.post("/homes-delete/:homeId",deleteHome)

module.exports = hostRouter;
